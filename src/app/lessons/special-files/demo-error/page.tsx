'use client';

import { useState, useEffect } from 'react';

export default function ErrorDemoPage() {
    const [shouldCrash, setShouldCrash] = useState(false);

    useEffect(() => {
        // We trigger the crash inside a timeout to ensure the component is mounted
        // and error.tsx can catch the render/lifecycle error
        const timer = setTimeout(() => {
            setShouldCrash(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (shouldCrash) {
        // This will throw a runtime error
        throw new Error('Explosion caused by manual simulation! 💣');
    }

    return (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-800/50 rounded-3xl border border-slate-700 min-h-[300px] text-center">
            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold text-white mb-2">Preparing the explosion...</h2>
            <p className="text-slate-400">The crash will occur in 1 second.</p>
        </div>
    );
}
