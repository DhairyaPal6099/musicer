export default function Profile() {
    return (
        <>
            <main className="flex flex-col p-5">
                <h1 className="text-4xl font-bold">Profile</h1>
                <div className="mt-5">
                    <p className="text-lg mt-5">Name</p>
                    <input type="text" className="mt-2 border p-2 rounded" defaultValue="JohnDoe" />
                    <p className="text-lg mt-5">Email</p>
                    <input type="email" className="mt-2 border p-2 rounded" defaultValue="johndoe@gmail.com" />
                    <p className="text-lg mt-5">Instruments</p>
                </div>
            </main>
        </>
    );
}