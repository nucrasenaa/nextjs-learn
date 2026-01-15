'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import CodeBlock from '@/components/CodeBlock';

export default function WorkshopPokemonPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.workshopPokemon;
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'search' | 'list'>('search');
    const [pokemonList, setPokemonList] = useState<any[]>([]);

    // 1. Fetch List on Mount
    useEffect(() => {
        const fetchList = async () => {
            // Basic fetch of first 20 pokemon
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setPokemonList(res.data.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchList();
    }, []);

    // 2. Search Function
    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        // If empty search, fetch offset 20 list
        if (!searchTerm.trim()) {
            setLoading(true);
            setError('');
            setPokemon(null);
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
                setPokemonList(res.data.results);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch list');
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setError('');
        setPokemon(null);

        try {
            // PokeAPI accepts name or id
            const lowerTerm = searchTerm.toLowerCase();
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerTerm}`);
            setPokemon(res.data);
            setMode('search');
        } catch (err) {
            setError('Pokemon not found!');
        } finally {
            setLoading(false);
        }
    };

    const handleRandom = () => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        setSearchTerm(randomId.toString());
        // We can't immediately call handleSearch because updated state might not be ready if we used state directly,
        // but here we can just pass the value to a clear function or call the api directly.
        // Better: just set term and call a separate fetcher or just wait for user to click search. 
        // Let's force search by calling axios directly or refactoring.
        // Refactoring for simplicity:
        searchById(randomId);
    };

    const searchById = async (id: number | string) => {
        setSearchTerm(id.toString());
        setLoading(true);
        setError('');
        setPokemon(null);
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(res.data);
            setMode('search');
        } catch (err) {
            setError('not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                    {t.title}
                </h1>
                <p className="text-xl text-slate-400">
                    {t.intro}
                </p>
            </div>

            {/* Search Box */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-1 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        {t.searchBtn}
                    </button>
                    <button
                        onClick={handleRandom}
                        className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
                    >
                        {t.randomBtn}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-center font-semibold animate-pulse">
                        {error}
                    </div>
                )}
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-red-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-400 animate-pulse">Loading Pokemon Data...</p>
                </div>
            ) : pokemon ? (
                // Pokemon Detail View
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
                    <div className="bg-gradient-to-br from-red-600 to-red-900 p-8 flex justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')] bg-center bg-no-repeat bg-contain blur-lg"></div>
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-64 h-64 object-contain z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                        />
                        <h2 className="absolute bottom-4 left-8 text-6xl font-black text-white/10 uppercase tracking-widest z-0">
                            #{String(pokemon.id).padStart(3, '0')}
                        </h2>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-white capitalize mb-4">{pokemon.name}</h2>
                            <div className="flex justify-center gap-3">
                                {pokemon.types.map((t: any) => (
                                    <span key={t.type.name} className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider
                                        ${getTypeColor(t.type.name)} text-white shadow-lg`}>
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/50 p-6 rounded-2xl">
                            <StatBox label={t.height} value={`${pokemon.height / 10} m`} />
                            <StatBox label={t.weight} value={`${pokemon.weight / 10} kg`} />
                            <StatBox label="XP" value={pokemon.base_experience} />
                            <StatBox label="Abilities" value={pokemon.abilities.length} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-300 border-b border-slate-700 pb-2">{t.stats}</h3>
                            <div className="space-y-3">
                                {pokemon.stats.map((s: any) => (
                                    <div key={s.stat.name} className="flex items-center gap-4">
                                        <span className="w-32 text-slate-400 capitalize font-medium">{s.stat.name}</span>
                                        <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                                                style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-12 text-right text-slate-200 font-bold">{s.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Initial Grid List (Mini Gallery)
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-400">{t.listTitle}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {pokemonList.map((p, index) => {
                            const id = p.url.split('/').filter(Boolean).pop();
                            return (
                                <button
                                    key={p.name}
                                    onClick={() => searchById(id)}
                                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500/50 p-4 rounded-xl flex flex-col items-center gap-3 transition-all group"
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={p.name}
                                        className="w-20 h-20 group-hover:scale-110 transition-transform pixelated"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                    <span className="text-sm font-medium text-slate-300 capitalize group-hover:text-white">
                                        {p.name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
            {/* How it works */}
            <div className="border-t border-slate-800 pt-8 mt-12 space-y-8">
                <h2 className="text-3xl font-bold text-white">How it works (Code Logic)</h2>

                <section>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">1. Fetching Initial List (useEffect)</h3>
                    <CodeBlock
                        title="FetchList.tsx"
                        code={`// Load first 20 Pokemon when component mounts
useEffect(() => {
  const fetchList = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      setPokemonList(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };
  fetchList();
}, []);`}
                    />
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-red-400 mb-4">2. Searching by Name/ID (Axios)</h3>
                    <CodeBlock
                        title="SearchLogic.tsx"
                        code={`const handleSearch = async () => {
  if (!searchTerm) return;
  setLoading(true);
  setError('');

  try {
    // PokeAPI supports searching by Name or ID
    const term = searchTerm.toLowerCase();
    const res = await axios.get(\`https://pokeapi.co/api/v2/pokemon/\${term}\`);
    setPokemon(res.data); // Save the detailed data
  } catch (err) {
    setError('Pokemon not found!');
  } finally {
    setLoading(false); // Stop loading indicator
  }
};`}
                    />
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">{t.renderTitle || '3. Rendering List (Map)'}</h3>
                    <CodeBlock
                        title="RenderList.tsx"
                        code={`{/* Map through the array and return JSX for each item */}
{pokemonList.map((p, index) => {
    const id = p.url.split('/').filter(Boolean).pop();
    return (
        <button key={p.name} onClick={() => searchById(id)}>
            <img 
               src={\`https://.../sprites/pokemon/\${id}.png\`} 
               alt={p.name} 
            />
            <span>{p.name}</span>
        </button>
    )
})}`}
                    />
                </section>
            </div>
        </div>
    );
}

function StatBox({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="text-center">
            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">{label}</p>
            <p className="text-xl font-mono text-white">{value}</p>
        </div>
    );
}

function getTypeColor(type: string) {
    const colors: Record<string, string> = {
        fire: 'bg-orange-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-cyan-400',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-amber-700',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-lime-500',
        rock: 'bg-stone-500',
        ghost: 'bg-violet-700',
        dragon: 'bg-indigo-700',
        dark: 'bg-slate-700',
        steel: 'bg-slate-500',
        fairy: 'bg-rose-400',
        normal: 'bg-slate-400',
    };
    return colors[type] || 'bg-slate-500';
}
