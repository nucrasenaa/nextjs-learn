'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function StatePage() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [user, setUser] = useState({ name: 'Guest', role: 'Visitor' });

    // Array State Demo
    const [items, setItems] = useState<string[]>(['Apple', 'Banana']);

    const { dict } = useLanguage();
    const t = dict.lessons.state;

    const updateName = () => {
        // ❌ WRONG: user.name = "John"; (Direct mutation won't trigger re-render)
        // ✅ CORRECT: Create a new object
        setUser({ ...user, name: 'John Doe' });
    };

    // Array Handlers (Immutable Patterns)
    const addItem = () => {
        // items.push('Cherry') <-- WRONG
        setItems([...items, 'Cherry']);
    };

    const popItem = () => {
        // items.pop() <-- WRONG
        // Create copy then pop, OR use slice
        setItems(items.slice(0, -1));
    };

    const removeItem = (indexToRemove: number) => {
        // items.splice(index, 1) <-- WRONG
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Example 1: Basic Counter */}
                <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                    <h2 className="text-xl font-semibold text-purple-400 mb-4">{t.basicTitle}</h2>
                    <CodeBlock
                        title="Counter.tsx"
                        code={`console.log("Rendered!");
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`}
                    />
                    <div className="mt-4 flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div className="text-4xl font-mono font-bold text-white mb-4">{count}</div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCount(count - 1)}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                            >
                                -
                            </button>
                            <button
                                onClick={() => setCount(count + 1)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </section>

                {/* Example 2: Input Field */}
                <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                    <h2 className="text-xl font-semibold text-indigo-400 mb-4">{t.inputTitle}</h2>
                    <CodeBlock
                        title="Input.tsx"
                        code={`const [text, setText] = useState('');

<input 
  value={text} 
  onChange={(e) => setText(e.target.value)} 
/>`}
                    />
                    <div className="mt-4 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t.placeholder}
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <p className="mt-4 text-slate-400">
                            {t.youTyped} <span className="text-indigo-400 font-medium">{text || '...'}</span>
                        </p>
                    </div>
                </section>
            </div>

            {/* Example 3: Complex State (Object) */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-sky-400 mb-4">{t.complexTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.complexDesc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <CodeBlock
                            title="ObjectUpdated.tsx"
                            code={`{/* ✅ Correct way to update object: Spread first! */}
setUser({ ...user, name: 'John Doe' });`}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div className="text-left w-full max-w-xs space-y-2 mb-4 font-mono text-sm bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <p><span className="text-slate-500">name:</span> <span className="text-green-400">"{user.name}"</span></p>
                            <p><span className="text-slate-500">role:</span> <span className="text-yellow-400">"{user.role}"</span></p>
                        </div>
                        <button
                            onClick={updateName}
                            className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors w-full max-w-xs"
                        >
                            {t.updateName}
                        </button>
                    </div>
                </div>
            </section>

            {/* Example 4: Arrays */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-teal-500/30">
                <h2 className="text-2xl font-semibold text-teal-400 mb-4">{t.arrayTitle}</h2>
                <p className="text-slate-400 mb-6 font-medium">
                    {t.arrayDesc}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Code Examples */}
                    <div className="space-y-4">
                        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <div className="text-red-400 text-xs font-bold uppercase mb-2">{t.arrayWarning}</div>
                            <code className="text-sm font-mono text-red-300 block">
                                arr.push('New'); <br />
                                setArr(arr); // React won't see a change!
                            </code>
                        </div>
                        <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                            <div className="text-emerald-400 text-xs font-bold uppercase mb-2">{t.arrayCorrect}</div>
                            <code className="text-sm font-mono text-emerald-300 block">
                                {`// Push -> Spread`} <br />
                                {`setArr([...arr, 'New']);`} <br /><br />
                                {`// Pop -> Slice`} <br />
                                {`setArr(arr.slice(0, -1));`} <br /><br />
                                {`// Splice -> Filter`} <br />
                                {`setArr(arr.filter((_, i) => i !== 1));`}
                            </code>
                        </div>
                    </div>

                    {/* Right: Interactive Demo */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col gap-4">
                        <div className="flex-1 bg-slate-950 rounded-lg p-4 border border-slate-800 min-h-[120px]">
                            <div className="text-xs text-slate-500 mb-2">Current Array:</div>
                            <div className="flex flex-wrap gap-2">
                                {items.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-md text-sm animate-in fade-in zoom-in duration-200">
                                        {i}: {item}
                                    </span>
                                ))}
                                {items.length === 0 && <span className="text-slate-600 italic">Empty Array []</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={addItem} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-colors">
                                {t.btnAdd}
                            </button>
                            <button onClick={popItem} disabled={items.length === 0} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50">
                                {t.btnPop}
                            </button>
                            <button onClick={() => removeItem(1)} disabled={items.length < 2} className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50">
                                {t.btnFilter}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
