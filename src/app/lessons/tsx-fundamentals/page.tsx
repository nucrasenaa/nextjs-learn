'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function TsxDataPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.tsxFundamentals;

    // Demo State
    const [showMessage, setShowMessage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Data for Map
    const fruits = [
        { id: 1, name: 'Apple', color: 'text-red-400', emoji: '🍎' },
        { id: 2, name: 'Banana', color: 'text-yellow-400', emoji: '🍌' },
        { id: 3, name: 'Grape', color: 'text-purple-400', emoji: '🍇' },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* 1. Map */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-pink-500 pl-4">{t.mapTitle || '1. List Rendering (.map)'}</h2>
                <p className="text-slate-400">{t.mapDesc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                        <ul className="space-y-3">
                            {fruits.map((fruit) => (
                                <li key={fruit.id} className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-700">
                                    <span className="text-2xl">{fruit.emoji}</span>
                                    <span className={`font-bold ${fruit.color}`}>{fruit.name}</span>
                                    <span className="text-xs text-slate-500 ml-auto">id: {fruit.id}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <CodeBlock 
                        title="MapExample.tsx"
                        code={`const fruits = [
  { id: 1, name: 'Apple', emoji: '🍎' },
  { id: 2, name: 'Banana', emoji: '🍌' },
];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit.id}>
        <span>{fruit.emoji}</span>
        <b>{fruit.name}</b>
      </li>
    ))}
  </ul>
);`}
                    />
                </div>
            </section>

            {/* 2. Short Circuit (&&) */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-sky-500 pl-4">{t.condTitle || '2. Short Circuit (&&)'}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center gap-6 min-h-[200px]">
                        <button 
                            onClick={() => setShowMessage(!showMessage)}
                            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2 rounded-full font-bold transition-all"
                        >
                            {showMessage ? t.condHide : t.condShow}
                        </button>

                        {showMessage && (
                            <div className="p-4 bg-sky-500/20 border border-sky-500 text-sky-200 rounded-xl animate-bounce">
                                Hello! I am conditionally rendered using &&
                            </div>
                        )}
                    </div>
                    <CodeBlock 
                        title="ShortCircuit.tsx"
                        code={`const [show, setShow] = useState(true);

return (
  <>
    <button onClick={() => setShow(!show)}>Toggle</button>

    {/* Render ONLY if show is true */}
    {show && (
      <div>Hello!</div>
    )}
  </>
);`}
                    />
                </div>
            </section>

             {/* 3. Ternary Operator */}
             <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-green-500 pl-4">{t.ternaryTitle || '3. Ternary Operator (? :)'}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center gap-6 min-h-[200px]">
                        <div className={`p-4 rounded-full w-20 h-20 flex items-center justify-center text-3xl mb-2 transition-colors ${
                            isLoggedIn ? 'bg-green-500 text-black' : 'bg-slate-700 text-slate-500'
                        }`}>
                            {isLoggedIn ? '👤' : '👻'}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {isLoggedIn ? t.loggedIn : t.guest}
                        </h3>
                        <button 
                            onClick={() => setIsLoggedIn(!isLoggedIn)}
                            className={`px-6 py-2 rounded-lg font-bold border ${
                                isLoggedIn 
                                    ? 'border-red-500 text-red-500 hover:bg-red-500/10' 
                                    : 'bg-green-600 text-white hover:bg-green-500'
                            }`}
                        >
                            {t.toggleLogin}
                        </button>
                    </div>
                    <CodeBlock 
                        title="TernaryExample.tsx"
                        code={`const [isLoggedIn, setLogin] = useState(false);

return (
  <div>
    {/* If true : else */}
    {isLoggedIn ? (
      <h1>Welcome User! 👤</h1>
    ) : (
      <h1>Please Log In 👻</h1>
    )}

    <button onClick={() => setLogin(!isLoggedIn)}>
      Toggle
    </button>
  </div>
);`}
                    />
                </div>
            </section>

             {/* 4. Fragments */}
             <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-indigo-500 pl-4">{t.fragmentTitle || '4. Fragments (<>...<>)'}</h2>
                <p className="text-slate-400">{t.fragmentDesc}</p>
                <CodeBlock 
                        title="Fragment.tsx"
                        code={`return (
  <> {/* No extra <div> created in DOM */}
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);`}
                />
            </section>
        </div>
    );
}
