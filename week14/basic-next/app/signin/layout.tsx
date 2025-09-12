import React from "react"

export default function subroute({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                nested/sub rendering
            </div>
            {children}
        </div>
    )
}