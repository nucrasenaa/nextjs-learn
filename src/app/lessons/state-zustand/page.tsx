'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function ZustandPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.stateZustand;

    // Simulation of Zustand Store
    const [bears, setBears] = useState(0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <section className="bg-slate-800/30 p-6 rounded-2xl border border-yellow-500/30">
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">{t.concept}</h2>
                        <p className="text-slate-400 mb-4">{t.conceptDesc}</p>
                        <div className="p-4 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 font-mono text-sm text-yellow-200">
                            useStore(state =&gt; state.bears)
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                            <h3 className="text-emerald-400 font-bold mb-2">Pros</h3>
                            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                {t.pros.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                        <section className="bg-rose-900/10 p-4 rounded-xl border border-rose-500/20">
                            <h3 className="text-rose-400 font-bold mb-2">Cons</h3>
                            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                {t.cons.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Demo */}
                <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <h2 className="text-2xl font-semibold text-white mb-4">{t.demoTitle}</h2>
                    <p className="text-slate-400 mb-6">{t.demoDesc}</p>

                    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 mb-6 relative overflow-hidden">
                        {/* Bear Background Animation */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                            <span style={{ fontSize: '150px' }}>🐻</span>
                        </div>

                        <span className="text-slate-500 text-sm uppercase tracking-widest mb-2">{t.bears}</span>
                        <span className="text-6xl font-black text-yellow-400 mb-6 tabular-nums relative z-10">{bears}</span>
                        <div className="flex gap-2 w-full relative z-10">
                            <button
                                onClick={() => setBears(bears + 1)}
                                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg transition-colors font-bold"
                            >
                                {t.addBear}
                            </button>
                            <button
                                onClick={() => setBears(Math.max(0, bears - 1))}
                                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-bold"
                            >
                                {t.removeBear}
                            </button>
                            <button
                                onClick={() => setBears(0)}
                                className="px-4 py-3 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors font-bold"
                            >
                                x
                            </button>
                        </div>
                    </div>

                    <CodeBlock
                        title="store.ts (Zustand)"
                        code={`import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

// Usage in Component
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} bears</h1>
}`}
                    />
                </section>
            </div>
        </div>
    );
}
