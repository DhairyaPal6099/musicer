"use client"

import { usePathname } from "next/navigation"

export default function BackgroundVideo() {
    const pathname = usePathname()

    // Show video only on homepage
    if (pathname !== "/") return null

    return (
        <>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/videos/music-bg.mp4" type="video/mp4" />
            </video>
            <div className="fixed inset-0 bg-black/60 -z-10" />
        </>
    )
}