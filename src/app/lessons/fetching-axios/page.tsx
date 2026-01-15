'use client';

import { useState } from 'react';
import axios from 'axios';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

interface Pokemon {
    name: string;
    url: string;
}

export default function AxiosPage() {
    const [posts, setPosts] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>('Idle');

    const { dict } = useLanguage();
    const t = dict.lessons.axios;

    const fetchPosts = () => {
        setLoading(true);
        setStatus('Requesting...');

        // Axios automatically transforms JSON data
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=3')
            .then((response) => {
                setStatus(`Success! Status: ${response.status}`);
                setPosts(response.data.results);
            })
            .catch((error) => {
                setStatus(`Error: ${error.message}`);
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">{t.vsTitle}</h2>
                <ul className="list-disc list-inside text-slate-400 mb-6 space-y-2">
                    {t.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>

                <CodeBlock
                    title="AxiosPokemon.tsx"
                    code={`import { useState } from 'react';
import axios from 'axios';

const [pokemon, setPokemon] = useState([]);

axios.get('https://pokeapi.co/api/v2/pokemon?limit=3')
  .then(res => {
    setPokemon(res.data.results);
  })
  .catch(err => {
    console.error(err);
  });`}
                />

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">{t.demoTitle}</h3>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-mono text-slate-500">{status}</span>
                            <button
                                onClick={fetchPosts}
                                disabled={loading}
                                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                            >
                                {loading ? '...' : t.fetchBtn}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900 min-h-[200px] rounded-xl border border-slate-700/50 p-4">
                        {posts.length > 0 ? (
                            <div className="space-y-3">
                                {posts.map((post, i) => (
                                    <div key={i} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-orange-500/50 transition-colors">
                                        <h4 className="font-bold text-orange-200 mb-2 truncate capitalize">{post.name}</h4>
                                        <p className="text-sm text-slate-400 line-clamp-2">{post.url}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
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
