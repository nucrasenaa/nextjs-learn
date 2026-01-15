'use client';

import { useState, createContext, useContext } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

// 1. Create Context
const UserContext = createContext<{ user: string | null; login: () => void; logout: () => void } | null>(null);

// 2. Provider Component (Simulated for this page only)
const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const login = () => setUser("Alice_Dev");
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// 3. Consumer Component
const UserStatus = () => {
    const context = useContext(UserContext);
    const { dict } = useLanguage();
    if (!context) return null;
    const { user, login, logout } = context;

    return (
        <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
            <div>
                {user ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {dict.lessons.context.welcome} {user}!
                    </span>
                ) : (
                    <span className="text-slate-500 italic">Guest User</span>
                )}
            </div>
            <button
                onClick={user ? logout : login}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${user
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
            >
                {user ? dict.lessons.context.logout : dict.lessons.context.login}
            </button>
        </div>
    );
};

export default function ContextPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.context;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">{t.demoTitle}</h2>
                <p className="text-slate-400 mb-4">{t.desc}</p>

                {/* Wrapping the demo component with Provider locally */}
                <UserProvider>
                    <UserStatus />
                </UserProvider>

                <div className="mt-8">
                    <CodeBlock
                        title="UserContext.tsx"
                        code={`// 1. Create Context
const UserContext = createContext(null);

// 2. Wrap App with Provider
<UserContext.Provider value={{ user, login }}>
   <App />
</UserContext.Provider>

// 3. Use in Any Child
const { user } = useContext(UserContext);`}
                    />
                </div>
            </section>
        </div>
    );
}
