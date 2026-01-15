'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function RoutingPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.routing;

    // Fake product data for demo
    const products = [1, 2, 3];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-teal-400 mb-4">{t.basicsTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.basicsDesc}
                </p>
                <CodeBlock
                    title="Structure"
                    code={`src/
  app/
    page.tsx       --> /
    lessons/
      routing/
        page.tsx   --> /lessons/routing
        [id]/
          page.tsx --> /lessons/routing/1`}
                />
            </section>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">{t.dynamicTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.dynamicDesc}
                </p>

                <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">{t.demoTitle}</h3>
                    <p className="text-slate-400 mb-4">{t.clickToTest}</p>
                    <div className="flex space-x-4">
                        {products.map(id => (
                            <Link
                                key={id}
                                href={`/lessons/routing/${id}`}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors font-mono text-teal-300"
                            >
                                /{id}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
