'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthLessonPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.auth;
    const [user, setUser] = useState<{ id: string; role: string } | null>(null);

    const handleLogin = () => {
        // Simulate setting a cookie/session
        setUser({ id: '123', role: 'Admin' });
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="space-y-12 pb-20">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-blue-500 pl-4">{t.conceptTitle}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-widest">{t.status}</p>
                                <p className={`text-lg font-bold ${user ? 'text-blue-400' : 'text-slate-500'}`}>
                                    {user ? t.loggedIn : t.loggedOut}
                                </p>
                            </div>
                            <div className="text-4xl">
                                {user ? '👨‍💻' : '🔒'}
                            </div>
                        </div>

                        {!user ? (
                            <button
                                onClick={handleLogin}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40"
                            >
                                {t.loginBtn}
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full py-4 bg-slate-700 hover:bg-red-900/50 hover:text-red-400 text-white font-bold rounded-xl transition-all border border-slate-600"
                            >
                                {t.logoutBtn}
                            </button>
                        )}
                    </div>

                    <p className="text-slate-400 leading-relaxed">
                        {t.conceptDesc} <br /><br />
                        <span className="text-sm text-slate-500 italic">
                            * In a real Next.js app, this would happen in <code className="text-slate-300">middleware.ts</code> which runs before every request.
                        </span>
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-purple-500 pl-4">{t.protectedTitle}</h2>
                <p className="text-slate-400">{t.protectedDesc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="relative h-[200px] bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {user ? (
                                <motion.div
                                    key="secret"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-bold"
                                >
                                    {t.secret}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="locked"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-2 text-slate-600"
                                >
                                    <span className="text-5xl">⛔</span>
                                    <p className="font-bold">Access Denied</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <CodeBlock 
                        title="middleware.ts (Pseudo-code)"
                        code={`export function middleware(req) {
  const token = req.cookies.get('token');

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}`}
                    />
                </div>
            </section>
        </div>
    );
}
