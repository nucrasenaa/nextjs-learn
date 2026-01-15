'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Captured Error:', error);
    }, [error]);

    return (
        <div className="p-12 bg-red-500/10 border border-red-500/30 rounded-3xl text-center space-y-8">
            <div className="text-7xl animate-bounce">🚨</div>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Oops! Something went wrong</h1>
                <p className="text-red-400 font-mono text-sm">Error: {error.message || 'Unknown Crash'}</p>
            </div>
            <p className="text-slate-400 max-w-md mx-auto">
                This UI is being served by <code className="bg-red-500/20 px-1 rounded text-red-300">error.tsx</code>. 
                It caught a runtime error from the page component and prevented the whole app from crashing.
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => reset()}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition-all"
                >
                    Try Again
                </button>
                <Link
                    href="/lessons/special-files"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition-all border border-slate-700"
                >
                    Back to Lesson
                </Link>
            </div>
        </div>
    );
}
