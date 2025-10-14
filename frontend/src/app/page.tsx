export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col justify-between pt-10 pl-10 bg-theme text-theme transition-colors duration-300">
        <h1 className="text-4xl font-bold text-primary">Hey User!👋</h1>
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