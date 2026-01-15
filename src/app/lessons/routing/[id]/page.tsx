'use client';

import { useLanguage } from "@/context/LanguageContext";
import { useParams, useRouter } from "next/navigation";

export default function DynamicRoutePage() {
    const params = useParams();
    const router = useRouter();
    // Note: In a real server component, you receive params as a prop. 
    // But since we are using 'use client' for the language context, we use the hook.

    // We can simulate fetching data based on ID
    const id = params.id as string;

    return (
        <div className="space-y-8 animate-pulse-fade-in">
            <button
                onClick={() => router.back()}
                className="text-slate-400 hover:text-white mb-4 flex items-center"
            >
                ← Back
            </button>

            <div className="bg-slate-900 border border-slate-700 p-12 rounded-2xl text-center">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    ID: <span className="text-teal-400">{id}</span>
                </h1>
                <p className="text-xl text-slate-400">
                    You are currently on the page: <span className="font-mono bg-slate-800 px-2 py-1 rounded">/lessons/routing/{id}</span>
                </p>
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-lg inline-block text-left max-w-lg">
                    <strong>Code for this page:</strong>
                    <pre className="font-mono text-xs mt-2 text-slate-300 whitespace-pre-wrap">
                        {`// src/app/lessons/routing/[id]/page.tsx
export default function Page({ params }: { params: { id: string } }) {
  return <h1>ID: {params.id}</h1>
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
