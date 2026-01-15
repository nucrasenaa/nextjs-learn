'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function RSCPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.rsc;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-slate-800/30 p-6 rounded-2xl border border-blue-500/30">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">{t.serverTitle}</h2>
                    <p className="text-slate-400 mb-4">
                        {t.serverDesc}
                    </p>
                    <CodeBlock
                        title="ServerComponent.tsx"
                        code={`// No "use client" needed = Server (Default)

async function getUsers() {
  const res = await db.query('SELECT *...');
  return res;
}

export default async function Page() {
  const users = await getUsers();
  // console.log() -> Server Terminal
  return <div>{users.map(...)}</div>
}`}
                    />
                </section>

                <section className="bg-slate-800/30 p-6 rounded-2xl border border-indigo-500/30">
                    <h2 className="text-2xl font-semibold text-indigo-400 mb-4">{t.clientTitle}</h2>
                    <p className="text-slate-400 mb-4">
                        {t.clientDesc}
                    </p>
                    <CodeBlock
                        title="ClientComponent.tsx"
                        code={`"use client"; // Must be at top

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  // console.log() -> Browser Console
  return <button onClick={...}>...</button>
}`}
                    />
                </section>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 text-center">
                <h3 className="text-lg font-bold text-white mb-2">{t.demo}</h3>
                <p className="text-slate-400 mb-6">
                    Check your terminal vs browser console to see where logs define themselves.
                </p>
                <div className="flex justify-center space-x-8">
                    <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 w-64 text-left border border-slate-700">
                        <div className="border-b border-slate-800 pb-2 mb-2 text-slate-500">Terminal (Server)</div>
                        &gt; Compiling /lessons/rsc...<br />
                        &gt; {t.serverLog}
                    </div>
                    <div className="bg-white p-4 rounded-lg font-mono text-xs text-slate-800 w-64 text-left border border-slate-300">
                        <div className="border-b border-slate-200 pb-2 mb-2 text-slate-500">DevTools (Client)</div>
                        &gt; {t.clientLog}
                    </div>
                </div>
            </div>
        </div>
    );
}
