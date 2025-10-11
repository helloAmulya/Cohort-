"use client"

import * as React from "react"
import { SubmitForm } from "../components/submit-form"
import { QueueList } from "../components/queue-list"
import { CurrentPlayer } from "../components/current-player"
import { useLocalSWR } from "@/hooks/use-local-swr"
import type { QueueItem, StreamsResponse } from "../lib/types"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react";

const QUEUE_KEY = "fanqueue:queue"
const CURRENT_KEY = "fanqueue:current"

const REFRESH_INTERVAL_MS = 10 * 1000;

function sortQueue(items: QueueItem[]) {
    return [...items].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.submittedAt - b.submittedAt
    })
}

export default function Page() {

    const { data: session, status } = useSession();
    const { data: queue, set: setQueue } = useLocalSWR<QueueItem[]>(QUEUE_KEY, [])
    const { data: current, set: setCurrent } = useLocalSWR<QueueItem | null>(CURRENT_KEY, null)

    const sortedQueue = React.useMemo(() => sortQueue(queue ?? []), [queue])

    async function refreshStreams() {
        if (!session?.user?.email) return;

        try {
            const res = await fetch(`/api/streams/my`, {
                credentials: "include",
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }

            const { streams }: StreamsResponse = await res.json();
            setQueue(
                sortQueue(
                    streams.map((stream) => ({
                        id: stream.id,
                        videoId: stream.extractedId,
                        url: stream.url,
                        title: stream.title,
                        score: stream.upvotes,
                        submittedAt: new Date(stream.createdAt).getTime(),
                        upVotes: stream.upvotes,
                        downVotes: 0, // This will be calculated based on score
                        haveUpvoted: stream.haveUpvoted,
                    }))
                )
            );
        }
        catch (error: any) {
            console.error("Refresh streams failed:", error);
            toast.error(error.message || "Failed to load streams");
        }
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(refreshStreams, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [session]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        return (
            <div>
                <p>You need to sign in to access the dashboard and upvote.</p>
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            </div>
        );
    }

    async function addToQueue(item: QueueItem) {
        if (!session?.user?.email) {
            toast.error("You must be signed in to add a stream.");
            return;
        }

        try {
            const res = await fetch("/api/streams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: item.url }),
                credentials: "include",
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }

            const { id: streamId } = await res.json();
            setQueue((prev) => {
                const newItem = { ...item, id: streamId };
                return sortQueue([...prev, newItem]);
            });

            toast.success("Stream added to queue!");
        } catch (error: any) {
            console.error("Add to queue failed:", error);
            toast.error(error.message || "Failed to add stream");
        }
    }

    async function vote(id: string, delta: 1 | -1) {
        if (!session?.user?.email) {
            toast.error("You must be signed in to vote.");
            return;
        }

        const endpoint = delta === 1 ? "/api/streams/upvote" : "/api/streams/downvote";

        // Optimistic UI update
        setQueue((prev) =>
            sortQueue(
                prev.map((item) => {
                    if (item.id !== id) return item;
                    const score = item.score + delta;
                    return { ...item, score };
                })
            )
        );

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ streamId: id }),
                credentials: "include",
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message);
            }
        } catch (error: any) {
            console.error("Vote failed:", error);
            toast.error(error.message || "Failed to vote");

            // Revert optimistic update on failure
            setQueue((prev) =>
                sortQueue(
                    prev.map((item) => {
                        if (item.id !== id) return item;
                        const score = item.score - delta;
                        return { ...item, score };
                    })
                )
            );
        }
    }

    function startTop() {
        if (sortedQueue.length === 0) return
        const next = sortedQueue[0]
        setCurrent(next)
        setQueue((prev) => prev.filter((x) => x.id !== next.id))
    }

    function skipToNext() {
        setCurrent(null)
        setTimeout(startTop, 0)
    }

    function isDuplicate(videoId: string) {
        return queue.some((x) => x.videoId === videoId) || current?.videoId === videoId
    }


    async function sharePage() {
        const url = window.location.href
        try {
            if (navigator.share) {
                await navigator.share({ title: document.title || "FanQueue", url })
                return
            }
            await navigator.clipboard.writeText(url)
            toast("Link copied to clipboard ")
        } catch {
            try {
                await navigator.clipboard.writeText(url)
                toast("Link copied to clipboard ")
            } catch {
                toast.error("Unable to share or copy link.")
            }
        }
    }

    return (
        <main className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
            <header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    FanQueue — Creator Dashboard
                </h1>
                <div className="md:ml-auto">
                    <Button onClick={sharePage}>Share</Button>
                </div>
            </header>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <CurrentPlayer current={current} onStartTop={startTop} onSkip={skipToNext} />
                    <QueueList items={sortedQueue} onVote={vote} />
                </div>

                <div className="md:col-span-1 space-y-6">
                    <SubmitForm onAdd={addToQueue} isDuplicate={isDuplicate} />
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                        • Links are stored locally in your browser for demo purposes.
                        <br />• Duplicate submissions count as an upvote.
                    </div>
                </div>
            </section>
        </main>
    )
}