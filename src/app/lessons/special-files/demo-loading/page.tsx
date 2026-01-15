import Link from 'next/link';

async function getData() {
    // Simulate slow network request
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { status: 'success' };
}

export default async function LoadingDemoPage() {
    await getData();

    return (
        <div className="p-8 bg-orange-500/10 border border-orange-500/30 rounded-3xl text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-white">Loaded Successfully!</h1>
            <p className="text-slate-300">
                You just saw <code className="bg-orange-500/20 px-2 py-1 rounded">loading.tsx</code> in action. 
                Next.js automatically showed the skeleton while this page was "fetching" data.
            </p>
            <div className="pt-4">
                <Link 
                    href="/lessons/special-files"
                    className="text-orange-400 hover:text-orange-300 font-medium underline"
                >
                    ← Back to Lesson
                </Link>
            </div>
        </div>
    );
}
