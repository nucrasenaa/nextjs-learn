'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function CSSLayoutPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.cssLayout;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* Flexbox Section */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-blue-500/30">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">{t.flexTitle}</h2>
                <p className="text-slate-400 mb-6">{t.flexDesc}</p>

                {/* Changed to xl:flex-row to prevent squashing on medium screens due to sidebar */}
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="flex-1">
                        <CodeBlock
                            title="Flexbox.tsx"
                            code={`// Centering Content
<div className="flex items-center justify-center h-32 bg-slate-900">
  <div className="bg-blue-500 p-4">Centered</div>
</div>

// Spacing Items
<div className="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>`}
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
                            <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
                                Centered
                            </div>
                        </div>
                        <div className="h-16 bg-slate-900 rounded-lg flex items-center justify-between px-6 border border-slate-700">
                            <div className="bg-slate-700 px-3 py-1 rounded text-slate-300">Left</div>
                            <div className="bg-slate-700 px-3 py-1 rounded text-slate-300">Right</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-cyan-500/30">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{t.gridTitle}</h2>
                <p className="text-slate-400 mb-6">{t.gridDesc}</p>

                {/* Changed to xl:flex-row to give grid items enough width */}
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="flex-1">
                        <CodeBlock
                            title="Grid.tsx"
                            code={`<div className="grid grid-cols-3 gap-4">
  <div className="bg-cyan-500 h-20">1</div>
  <div className="bg-cyan-600 h-20">2</div>
  <div className="bg-cyan-700 h-20">3</div>
  <div className="bg-cyan-800 h-20">4</div>
  <div className="bg-cyan-900 h-20">5</div>
  ...
</div>`}
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className={`h-20 rounded-lg flex items-center justify-center text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 ${i % 2 === 0 ? 'bg-cyan-600' : 'bg-cyan-500'
                                        }`}
                                >
                                    {t.demoItem} {i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
