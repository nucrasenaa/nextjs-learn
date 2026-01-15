'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

interface Pokemon {
    name: string;
    url: string;
}

export default function FetchPage() {
    const [data, setData] = useState<Pokemon[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { dict } = useLanguage();
    const t = dict.lessons.fetch;

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // Native fetch API
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Simulate delay for demo purposes
            setTimeout(() => {
                setData(result.results);
                setLoading(false);
            }, 1000);

        } catch (e) {
            setError(e instanceof Error ? e.message : "An error occurred");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">{t.patternTitle}</h2>
                <p className="text-slate-400 mb-4">
                    {t.patternDesc}
                </p>

                <CodeBlock
                    title="FetchPokemon.tsx"
                    code={`const [pokemon, setPokemon] = useState(null);
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3');
    const json = await res.json();
    setPokemon(json.results); // PokeAPI returns { results: [...] }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};`}
                />

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">{t.liveDemo}</h3>
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                        >
                            {loading ? t.fetching : t.fetchBtn}
                        </button>
                    </div>

                    <div className="bg-slate-900 min-h-[200px] rounded-xl border border-slate-700/50 p-4">
                        {loading && (
                            <div className="flex flex-col items-center justify-center h-full text-emerald-400">
                                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-2"></div>
                                <span>{t.loading}</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center justify-center h-full text-rose-400">
                                ⚠️ {t.error} {error}
                            </div>
                        )}

                        {data && !loading && (
                            <div className="space-y-3 animate-pulse-fade-in">
                                {data.map((poke, index) => (
                                    <div key={index} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center border border-slate-700 hover:border-emerald-500/50 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-slate-200 capitalize">{poke.name}</h3>
                                            <p className="text-sm text-slate-400">{poke.url}</p>
                                        </div>
                                        <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-400">Index: {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!data && !loading && !error && (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                {t.clickToLoad}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
