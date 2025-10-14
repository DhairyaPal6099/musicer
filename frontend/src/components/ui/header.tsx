import Link from "next/link";

export default function Header() {
    return (
        <header className="flex bg-header text-header items-center justify-between p-4">
            <h2><a href="/" className="text-primary hover:opacity-80 transition-opacity">(Logo) Musicer</a></h2>
            <h2><Link href="/dashboard" className="text-primary hover:opacity-80 transition-opacity">Dashboard</Link></h2>
            <h2><Link href="/profile" className="text-primary hover:opacity-80 transition-opacity">Practice</Link></h2>
            <h2><Link href="/profile" className="text-primary hover:opacity-80 transition-opacity">AI Tools</Link></h2>
            <h2><Link href="/profile" className="text-primary hover:opacity-80 transition-opacity">Stats</Link></h2>
            <h2><Link href="/profile" className="text-primary hover:opacity-80 transition-opacity">(Profile Photo)</Link></h2>
        </header>
    );
}