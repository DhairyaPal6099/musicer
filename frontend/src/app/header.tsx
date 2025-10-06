import Link from "next/link";

export default function Header() {
    return (
        <header className="flex bg-theme text-theme items-center justify-between p-4">
            <h2><Link href="/" className="text-primary hover:opacity-80 transition-opacity">(Logo) Musicer</Link></h2>
            <h2><Link href="/profile" className="text-primary hover:opacity-80 transition-opacity">(Profile photo)</Link></h2>
        </header>
    );
}