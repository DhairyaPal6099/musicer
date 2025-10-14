"use client"

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col justify-between pt-10 pl-10 pr-10 bg-theme text-theme transition-colors duration-300">
                <h1 className="text-4xl font-bold mb-8 text-primary">What's up Champ!</h1>

                {/* Overview section */}
                <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-gray-200">
                    <h2 className="text-2xl font-semibold mb-2">🎵 Welcome back, Dhairya!</h2>
                    <p>You’ve practiced <b>3 days</b> this week — that’s <b>5 hours total</b>. Keep up the streak 🔥</p>
                    <div className="mt-3 bg-gray-800 h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full w-[60%]" />
                    </div>
                </section>

                {/* Stats section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                        { title: "Hours Practiced", value: "12h" },
                        { title: "Current Streak", value: "4 days" },
                        { title: "Top Instrument", value: "Guitar 🎸" },
                        { title: "Avg BPM Growth", value: "+8%" },
                    ].map((stat) => (
                        <div key={stat.title} className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 text-center">
                            <h3 className="text-sm text-gray-400">{stat.title}</h3>
                            <p className="text-xl font-semibold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* AI tip of the day section */}
                <section className="mt-10 bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-3">🧠 Tip of the Day</h2>
                    <p className="text-gray-300">
                        Try increasing your warm-up scale speed by <b>+5 BPM</b> today for sharper accuracy.
                        Focus on your finger placement during transitions 🎯
                    </p>
                </section>

                {/* Recommended practice video section */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold mb-3">🎬 Recommended Practice Video</h2>
                    <p className="text-gray-400 mb-4">Based on your profile: <b>Guitar - Rock</b></p>
                    <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Practice Video"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* Recent sessions section */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold mb-3">🗓️ Recent Practice Sessions</h2>
                    <div className="flex flex-col gap-4">
                        {[
                            { instrument: "Guitar", duration: "45 min", bpm: 120, date: "Oct 12" },
                            { instrument: "Drums", duration: "30 min", bpm: 100, date: "Oct 11" },
                            { instrument: "Piano", duration: "25 min", bpm: 90, date: "Oct 10" },
                        ].map((session, index) => (
                            <div
                                key={index}
                                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-white font-medium">{session.instrument}</p>
                                    <p className="text-gray-400 text-sm">
                                        {session.date} — {session.duration} at {session.bpm} BPM
                                    </p>
                                </div>
                                <span className="text-primary font-semibold">✅ Logged</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Challenge of the week section */}
                <section className="mt-10 mb-10 bg-gradient-to-r from-purple-700/40 to-blue-600/30 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-3">⚡ Challenge of the Week</h2>
                    <p className="text-gray-200">
                        Master the opening riff of <b>“Sweet Child O’ Mine”</b> 🎸
                        Upload your progress clip by Sunday to earn bonus XP!
                    </p>
                </section>
            </main>
        </>
    );
}