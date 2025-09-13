import React from "react"

// we can either use the layout format to have specific routes / sub-routes, or use (auth) notation to have direct routes

export default function subroute({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="bg-neutral-200 flex items-center justify-center p-4 w-full">
                nested/sub rendering
            </div>
            {children}
        </div>
    )
}

