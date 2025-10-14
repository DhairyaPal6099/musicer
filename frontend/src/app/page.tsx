"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col justify-between pt-10 pl-10 bg-theme text-theme transition-colors duration-300">

        {/* BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/music-bg.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 -z-10" />

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-10 px-4 w-full">
          <h1 className="text-5xl text-gray-100 md:text-6xl font-bold mb-4">🎵 Musicer</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-xl">
            Track. Improve. Master your sound.
          </p>
          <Button size="lg" className="text-lg px-10 py-6 border bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
            <Link href="/dashboard" className="text-gray-400 font-bold">Log In</Link>
          </Button>
        </section>

        {/* FEATURES SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-16 space-y-12 text-center">
          {/* Core Features */}
          <div>
            <h2 className="text-3xl text-gray-200 font-bold mb-6">🎯 Core Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">🎸 Practice Tracker</h3>
                  <p className="text-gray-400">
                    Log your sessions for guitar, piano, drums, and bass — record duration, BPM, and personal notes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">📊 Progress Dashboard</h3>
                  <p className="text-gray-400">
                    Visualize your growth with time-spent charts, consistency streaks, and tempo improvements.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">🎹 Multi-Instrument Support</h3>
                  <p className="text-gray-400">
                    Switch easily between instruments and manage personalized practice goals for each one.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI-Powered Features */}
          <div>
            <h2 className="text-3xl text-gray-200 font-bold mt-10 mb-6">🤖 AI-Powered Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">🎧 Performance Analyzer</h3>
                  <p className="text-gray-400">
                    Let an AI model evaluate your logs and generate a personalized <strong>Performance Score</strong> to track your improvement.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">🎵 Smart Song Recommender</h3>
                  <p className="text-gray-400">
                    Discover trending hits from Spotify and YouTube or get <strong>AI-curated suggestions</strong> based on your practice history.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 hover:scale-105 hover:shadow-xl transition-transform">
                <CardContent className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">💬 Practice Q&A Chatbot</h3>
                  <p className="text-gray-400">
                    Chat with your virtual coach for warm-ups, drills, or technique advice — powered by fine-tuned transformer models.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
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