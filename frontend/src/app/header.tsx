import Link from "next/link";

export default function Header() {
    return (
        <header className="flex bg-gray-800 text-white items-center justify-between p-4">
            <h2><Link href="/">(Logo) Musicer</Link></h2>
            <h2><Link href="/profile">(Profile photo)</Link></h2>
        </header>
    );
}