'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import BearCounter from './BearCounter';

export default function ZustandPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.stateZustand;

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
                    <BearCounter />
                </section>
            </div>

            {/* Split Code View */}
            <div className="mt-8 space-y-8">
                <p className="text-slate-300 border-b border-slate-700 pb-4">
                    {t.splitTitle}
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* 1. Store */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs text-center border border-yellow-500/30">1</span>
                            Store Definition
                        </h3>
                        <CodeBlock
                            title={t.fileStore}
                            code={`import { create } from 'zustand';

interface BearState {
  bears: number;
  addBear: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));`}
                        />
                    </div>

                    {/* 2. Component */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs text-center border border-emerald-500/30">2</span>
                            Usage in Component
                        </h3>
                        <CodeBlock
                            title={t.fileComponent}
                            code={`'use client';
import { useStore } from './store';

export default function BearCounter() {
  const { bears, addBear, removeBear, removeAllBears } = useStore();

  return (
    <div>
      <h1>{bears} bears</h1>
      <button onClick={addBear}>Add Bear</button>
      <button onClick={removeBear}>Remove Bear</button>
      <button onClick={removeAllBears}>Clear</button>
    </div>
  );
}`}
                        />
                    </div>

                    {/* 3. Page */}
                    <div className="col-span-1 xl:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs text-center border border-blue-500/30">3</span>
                            Main Page
                        </h3>
                        <CodeBlock
                            title={t.filePage}
                            code={`import BearCounter from './BearCounter';

export default function Page() {
  return (
    <div className="p-10">
       <BearCounter />
    </div>
  )
}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
