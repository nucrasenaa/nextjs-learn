'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { UserProvider } from './UserContext';
import UserStatus from './UserStatus';

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
                <p className="text-slate-400 mb-6">{t.desc}</p>

                {/* Real separate provider */}
                <UserProvider>
                    <UserStatus />
                </UserProvider>

                <div className="mt-8 space-y-8">
                    <p className="text-slate-300 border-b border-slate-700 pb-4">
                        {t.splitTitle}
                    </p>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* 1. The Setup */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs text-center border border-purple-500/30">1</span>
                                Context Logic
                            </h3>
                            <CodeBlock
                                title={t.fileContext}
                                code={`'use client';
import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const login = () => setUser("Alice_Dev");
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}`}
                            />
                        </div>

                        {/* 2. The Consumer */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs text-center border border-pink-500/30">2</span>
                                Consumer Component
                            </h3>
                            <CodeBlock
                                title={t.fileConsumer}
                                code={`'use client';
import { useUser } from './UserContext';

export default function UserStatus() {
    const { user, login, logout } = useUser();

    return (
        <div className="flex gap-4">
            <p>User: {user || 'Guest'}</p>
            <button onClick={user ? logout : login}>
                {user ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}`}
                            />
                        </div>

                        {/* 3. Usage Option A */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs text-center border border-teal-500/30">3A</span>
                                Option: Wrap Page
                            </h3>
                            <CodeBlock
                                title={t.filePage}
                                code={`import { UserProvider } from './UserContext';
import UserStatus from './UserStatus';

export default function Page() {
    return (
        <UserProvider>
            <UserStatus />
        </UserProvider>
    );
}`}
                            />
                        </div>

                        {/* 4. Usage Option B */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs text-center border border-emerald-500/30">3B</span>
                                Option: Wrap Global (Layout)
                            </h3>
                            <CodeBlock
                                title={t.fileLayout}
                                code={`// src/app/layout.tsx
import { UserProvider } from './UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
           {children}
        </UserProvider>
      </body>
    </html>
  );
}`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
