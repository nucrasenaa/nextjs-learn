'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

// Standard JavaScript variable (outside component to persist)
let realLet = 0;

export default function VariablesPage() {
    // React State
    const [stateCount, setStateCount] = useState(0);

    // Dictionary
    const { dict } = useLanguage();
    const t = dict.lessons.variables;

    // This is a const, it cannot be changed
    const demoConst = 100;

    const handleLetIncrement = () => {
        realLet += 1;
        console.log(`Real Let updated: ${realLet} (But UI won't change!)`);
    };

    const handleStateIncrement = () => {
        setStateCount(prev => prev + 1);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* Section 1: Const */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t.constTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.constDesc}
                </p>
                <CodeBlock
                    title="const_example.ts"
                    code={`const pi = 3.14159;
const appName = "Next.js Learn";

// ${t.constError}
// pi = 3.14; // Error`}
                />
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">{t.currentVal} <span className="text-rose-400 font-mono">{demoConst}</span></p>
                </div>
            </section>

            {/* Section 2: Let vs State */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-amber-400 mb-4">{t.letTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.letDesc}
                </p>
                <CodeBlock
                    title="let_example.ts"
                    code={`let counter = 0;
counter = 1;
counter = 2; // ✅ OK!`}
                />

                {/* Simulation Area */}
                <div className="mt-6 border-t border-slate-700 pt-6">
                    <h3 className="text-xl font-bold text-white mb-2">{t.letVsStateTitle}</h3>
                    <p className="text-slate-400 mb-6">{t.letVsStateDesc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Real Let */}
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2">
                            <div className="text-sm text-slate-500 font-mono">variable (let)</div>
                            <div className="text-3xl font-bold text-slate-400 pointer-events-none">
                                {realLet}
                            </div>
                            <button
                                onClick={handleLetIncrement}
                                className="mt-2 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm"
                            >
                                {t.letBtn}
                            </button>
                        </div>

                        {/* React State */}
                        <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 flex flex-col items-center gap-2">
                            <div className="text-sm text-amber-500 font-mono">useState</div>
                            <div className="text-3xl font-bold text-amber-400">
                                {stateCount}
                            </div>
                            <button
                                onClick={handleStateIncrement}
                                className="mt-2 w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors text-sm"
                            >
                                {t.stateBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: TypeScript Types */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-sky-400 mb-4">{t.typeTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.typeDesc}
                </p>
                <CodeBlock
                    title="types.ts"
                    code={`// Explicit type annotation
let username: string = "Alice";

// Type inference (TypeScript knows 'age' is a number)
let age = 30; 

// age = "Thirty"; // ❌ Error: Type 'string' is not assignable to type 'number'.`}
                />
            </section>
        </div>
    );
}
