'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function SpecialFilesPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.specialFiles;

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Loading Section */}
                <section className="bg-slate-800/30 p-8 rounded-3xl border border-orange-500/20 space-y-6">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center gap-2">
                        <span>🚦</span> {t.loadingTitle}
                    </h2>
                    <p className="text-slate-400">
                        {t.loadingDesc}
                    </p>
                    <div className="pt-4">
                        <Link 
                            href="/lessons/special-files/demo-loading"
                            className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-orange-900/20"
                        >
                            {t.simulateLoad}
                        </Link>
                    </div>
                    <CodeBlock 
                        title="loading.tsx"
                        code={`export default function Loading() {
  return <SkeletonUI />;
}`}
                    />
                </section>

                {/* Error Section */}
                <section className="bg-slate-800/30 p-8 rounded-3xl border border-red-500/20 space-y-6">
                    <h2 className="text-2xl font-semibold text-red-400 flex items-center gap-2">
                        <span>💥</span> {t.errorTitle}
                    </h2>
                    <p className="text-slate-400">
                        {t.errorDesc}
                    </p>
                    <div className="pt-4">
                        <Link 
                            href="/lessons/special-files/demo-error"
                            className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-red-900/20"
                        >
                            {t.simulateError}
                        </Link>
                    </div>
                    <CodeBlock 
                        title="error.tsx"
                        code={`'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
                    />
                </section>
            </div>
        </div>
    );
}
