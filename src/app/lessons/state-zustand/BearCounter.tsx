'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useStore } from './store';

export default function BearCounter() {
    const { bears, addBear, removeBear, removeAllBears } = useStore();
    const { dict } = useLanguage();
    const t = dict.lessons.stateZustand;

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 mb-6 relative overflow-hidden">
            {/* Bear Background Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span style={{ fontSize: '150px' }}>🐻</span>
            </div>

            <span className="text-slate-500 text-sm uppercase tracking-widest mb-2">{t.bears}</span>
            <span className="text-6xl font-black text-yellow-400 mb-6 tabular-nums relative z-10">{bears}</span>
            <div className="flex gap-2 w-full relative z-10">
                <button
                    onClick={addBear}
                    className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg transition-colors font-bold"
                >
                    {t.addBear}
                </button>
                <button
                    onClick={removeBear}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-bold"
                >
                    {t.removeBear}
                </button>
                <button
                    onClick={removeAllBears}
                    className="px-4 py-3 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors font-bold"
                >
                    x
                </button>
            </div>
        </div>
    );
}
