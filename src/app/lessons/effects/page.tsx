'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function EffectsPage() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { dict } = useLanguage();
    const t = dict.lessons.effects;

    // Effect 1: Timer (Mount/Unmount & Dependency)
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }

        // Cleanup function: Run when component unmounts OR when dependencies change (isRunning changes)
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]); // Dependency array: Effect re-runs when 'isRunning' changes

    // Effect 2: Global Event Listener (Mount only)
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMove);

        // CRITICAL: Cleanup listener to prevent memory leaks
        return () => {
            window.removeEventListener('mousemove', handleMove);
        };
    }, []); // Empty dependency array: Runs ONLY on mount and unmount

    // Effect 3: Auto-Save (Debounce)
    const [text, setText] = useState('');
    const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, typing

    useEffect(() => {
        if (!text) return;
        setSaveStatus('typing');

        const timeoutId = setTimeout(() => {
            setSaveStatus('saving');
            // Simulate API call
            setTimeout(() => setSaveStatus('saved'), 500);
        }, 1000); // Wait 1s after stop typing

        // Cleanup: Clear timeout if user types again
        return () => clearTimeout(timeoutId);
    }, [text]);

    // Effect 4: Currency Converter (Fetch on Dependency Change)
    const [currency, setCurrency] = useState('USD');
    const [rate, setRate] = useState(35.5);

    useEffect(() => {
        // Simulate Fetching new rate when currency changes
        const rates: Record<string, number> = {
            'USD': 35.5,
            'JPY': 0.24,
            'EUR': 38.2
        };
        setRate(rates[currency]);
    }, [currency]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* Example 1: The Timer */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{t.timerTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.timerDesc}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <CodeBlock
                        title="TimerEffect.tsx"
                        code={`useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  // Cleanup Function
  return () => clearInterval(interval);
}, [isRunning]);`}
                    />

                    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-xl border border-slate-700/50 h-full">
                        <div className="text-6xl font-mono font-bold text-white mb-6 tabular-nums">
                            {seconds}s
                        </div>
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${isRunning
                                ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20'
                                : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                                }`}
                        >
                            {isRunning ? t.pauseTimer : t.startTimer}
                        </button>
                    </div>
                </div>
            </section>

            {/* Example 2: Window Events */}
            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">{t.cleanTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.cleanDesc}
                </p>

                <CodeBlock
                    title="EventListener.tsx"
                    code={`useEffect(() => {
  const handleMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener('mousemove', handleMove);

  // ✅ Cleanup: Remove listener when unmounting
  return () => {
    window.removeEventListener('mousemove', handleMove);
  };
}, []);`}
                />

                <div className="mt-6 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 flex justify-between items-center">
                    <div className="space-y-2">
                        <p className="text-slate-500 text-sm uppercase tracking-wider font-bold">{t.mousePos}</p>
                        <div className="font-mono text-2xl text-blue-300">
                            X: {mousePos.x}, Y: {mousePos.y}
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 max-w-xs text-right">
                        {t.moveMouse}
                    </div>
                </div>
            </section>

            {/* Real World Examples */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-6 border-t border-slate-700 pt-8">
                    {t.realWorldTitle}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example A: Auto-Save */}
                    <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col h-full">
                        <h2 className="text-xl font-semibold text-pink-400 mb-2">{t.autoSaveTitle}</h2>
                        <p className="text-slate-400 text-sm mb-4 h-20">{t.autoSaveDesc}</p>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex-1">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Start typing..."
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2 h-32 resize-none"
                            />
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className={saveStatus === 'saved' ? 'text-emerald-400' : 'text-amber-400'}>
                                    {saveStatus === 'typing' && `✏️ ${t.typing}`}
                                    {saveStatus === 'saving' && `💾 ${t.saving}`}
                                    {saveStatus === 'saved' && `✅ ${t.saved} ${new Date().toLocaleTimeString()}`}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <CodeBlock title="AutoSave.tsx" code={`useEffect(() => {
  setStatus('typing');
  const timer = setTimeout(() => {
    saveData(text);
    setStatus('saved');
  }, 1000);

  // Cleanup: Restart timer if typed again
  return () => clearTimeout(timer);
}, [text]);`} />
                        </div>
                    </section>

                    {/* Example B: Currency Converter */}
                    <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col h-full">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-2">{t.exchangeTitle}</h2>
                        <p className="text-slate-400 text-sm mb-4 h-20">{t.exchangeDesc}</p>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex flex-col justify-center items-center flex-1 space-y-6">
                            <div className="flex gap-4">
                                {['USD', 'EUR', 'JPY'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setCurrency(c)}
                                        className={`px-4 py-2 rounded-lg font-bold transition-all ${currency === c
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>

                            <div className="text-center">
                                <p className="text-slate-400 text-sm">{t.rate} (THB)</p>
                                <p className="text-6xl font-mono text-white mt-2 animate-pulse-short">{rate}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <CodeBlock title="CurrencySync.tsx" code={`useEffect(() => {
  // Fetch new rate when currency changes
  const newRate = await fetchRate(currency);
  setRate(newRate);
}, [currency]); // Dependency = currency`} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
