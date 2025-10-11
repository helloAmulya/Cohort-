// In app/lib/types.ts (or a new file)
export interface Stream {
  id: string;
  type: "Youtube" | "Spotify";
  url: string;
  extractedId: string;
  title: string;
  bigImg: string;
  smallImg: string;
  active: boolean;
  upvotes: number;
  haveUpvoted: boolean;
  createdAt: string; // Prisma returns ISO string for DateTime
}


export interface StreamsResponse {
  streams: Stream[];
}

export type QueueItem = {
  id: string;
  url: string;
  videoId: string;
  title?: string;
  score: number;
  submittedAt: number;
  upVotes?: number;
  downVotes?: number;
};

