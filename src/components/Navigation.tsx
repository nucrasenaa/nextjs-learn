'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useSidebar } from '@/context/SidebarContext';

export default function Navigation() {
    const pathname = usePathname();
    const { dict, language, setLanguage } = useLanguage();
    const { isCollapsed, toggleSidebar } = useSidebar();

    const navItems = [
        { name: dict.nav.home, path: '/', icon: '🏠' },
        { name: dict.nav.variables, path: '/lessons/variables', icon: '📦' },
        { name: dict.nav.state, path: '/lessons/state', icon: '⚡' },
        { name: dict.nav.effects, path: '/lessons/effects', icon: '✨' },
        { name: dict.nav.fetch, path: '/lessons/fetching-fetch', icon: '🌐' },
        { name: dict.nav.axios, path: '/lessons/fetching-axios', icon: '📡' },
        // Advanced Sections
        { name: dict.nav.routing, path: '/lessons/routing', icon: '🛣️' },
        { name: dict.nav.rsc, path: '/lessons/rsc', icon: '🖥️' },
        { name: dict.nav.serverActions, path: '/lessons/server-actions', icon: '🔌' },
        { name: dict.nav.context, path: '/lessons/context', icon: '🌍' },
        { name: dict.nav.stateRedux, path: '/lessons/state-redux', icon: '🔄' },
        { name: dict.nav.stateZustand, path: '/lessons/state-zustand', icon: '🐻' },
        { name: dict.nav.workshopPokemon, path: '/lessons/workshop-pokemon', icon: '🎮' },
        // CSS / UI Sections
        { name: dict.nav.cssLayout, path: '/lessons/css-layout', icon: '📐' },
        { name: dict.nav.cssResponsive, path: '/lessons/css-responsive', icon: '📱' },
        { name: dict.nav.cssAnimation, path: '/lessons/css-animation', icon: '🎨' },
    ];

    return (
        <nav className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen fixed left-0 top-0 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 p-4 transition-all duration-300 ease-in-out overflow-y-auto z-50 flex flex-col no-scrollbar`}>

            {/* Header & Toggle */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap overflow-hidden">
                            Next.js Learn
                        </h1>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mx-auto"
                    >
                        {isCollapsed ? '►' : '◄'}
                    </button>
                </div>

                {!isCollapsed && <p className="text-slate-400 text-xs">{dict.nav.subtitle}</p>}

                {/* Language Toggler */}
                <div className={`flex bg-slate-800 p-1 rounded-lg border border-slate-700 ${isCollapsed ? 'flex-col gap-1' : ''}`}>
                    <button
                        onClick={() => setLanguage('th')}
                        className={`flex-1 text-xs font-bold py-1 px-2 rounded transition-colors ${language === 'th' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        TH
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`flex-1 text-xs font-bold py-1 px-2 rounded transition-colors ${language === 'en' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        EN
                    </button>
                </div>
            </div>

            <ul className="space-y-1 flex-grow pb-12">
                {navItems.map((item, index) => {
                    const isActive = pathname.startsWith(item.path) && item.path !== '/';
                    const isHome = item.path === '/' && pathname === '/';
                    const active = isActive || isHome;

                    // Add separate between Basic, Advanced and CSS
                    const isAdvancedStart = index === 6;
                    // Adjusted index because we added 3 advanced items (Redux/Zustand/Workshop)
                    const isCssStart = index === 13;

                    return (
                        <li key={item.path} className={(isAdvancedStart || isCssStart) ? "mt-4 border-t border-slate-800 pt-4" : ""}>
                            {(isAdvancedStart || isCssStart) && !isCollapsed && (
                                <div className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                    {isAdvancedStart ? 'Advanced' : 'UI & Animations'}
                                </div>
                            )}
                            <Link
                                href={item.path}
                                title={isCollapsed ? item.name : ''}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${active
                                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 hover:pl-5'
                                    } ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!isCollapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
