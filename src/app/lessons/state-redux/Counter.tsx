'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, increment, decrement, reset } from './store';
import { useLanguage } from '@/context/LanguageContext';

export function CounterInfo() {
    const count = useSelector((state: RootState) => state.counter.value);
    return (
        <span className="text-6xl font-black text-white mb-6 tabular-nums animate-fade-in">
            {count}
        </span>
    );
}

export function CounterControls() {
    const dispatch = useDispatch();
    const { dict } = useLanguage();
    const t = dict.lessons.stateRedux;

    return (
        <div className="flex gap-2 w-full">
            <button
                onClick={() => dispatch(decrement())}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-bold"
            >
                {t.dec}
            </button>
            <button
                onClick={() => dispatch(reset())}
                className="flex-1 py-3 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors font-bold"
            >
                {t.reset}
            </button>
            <button
                onClick={() => dispatch(increment())}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-bold shadow-lg shadow-purple-900/20"
            >
                {t.inc}
            </button>
        </div>
    );
}
