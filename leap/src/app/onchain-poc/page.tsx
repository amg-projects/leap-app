export default function Page() {
    return (
        <div className="min-h-screen flex items-center">
            <div className="w-1/2 mx-auto">
                <DemoCard />
            </div>
        </div>
    )
}

function DemoCard() {
    return (
        <div className="bg-slate-900 p-10 border-slate-800 border-4">
            <h1 className="text-3xl font-bold">Onchain POC</h1>
            <p className="mt-4">This is a proof of concept for onchain data storage.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
            <p className="mt-4">The data is stored on the blockchain and can be accessed by anyone.</p>
        </div>
    )
}