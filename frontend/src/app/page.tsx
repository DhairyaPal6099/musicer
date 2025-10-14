"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col justify-between pt-10 pl-10 bg-theme text-theme transition-colors duration-300">
        <h1 className="text-4xl font-bold text-primary">Hey User!👋</h1>

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/music-bg.jpg"
            alt="Music background"
            fill
            className="object-cover"
            priority
          />
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">🎵 Musicer</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-xl">
            Track. Improve. Master your sound.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/practice">Practice Now</Link>
            </Button>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full max-w-6xl">
          <Card className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">🎸 Practice Tracker</h3>
              <p className="text-gray-400">
                Log your guitar, drums, and vocal sessions in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">📊 Progress Dashboard</h3>
              <p className="text-gray-400">
                Visualize your weekly practice stats and achievements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">🎤 Skill Insights</h3>
              <p className="text-gray-400">
                Get insights on where to focus next using tracked data.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-gray-500 text-sm">
          <center>
            Built by Dhairya Pal © 2025
          </center>
        </footer>
      </main>
    </>
  );
}