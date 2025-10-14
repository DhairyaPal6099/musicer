"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col justify-between pt-10 pl-10 bg-theme text-theme transition-colors duration-300">
                <h1 className="text-4xl font-bold text-primary">Hey User!👋</h1>

                {/* HERO SECTION */}
                <section className="flex flex-col items-center justify-center text-center py-20 px-4 w-full">
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/practice">Practice Now</Link>
                        </Button>
                    </div>
                </section>
            </main>
        </>
    );
}