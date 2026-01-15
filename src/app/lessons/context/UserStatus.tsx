'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useUser } from './UserContext';

export default function UserStatus() {
    // Navigate data from our custom Context
    const { user, login, logout } = useUser();
    
    // Just for translation text
    const { dict } = useLanguage();

    return (
        <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
            <div>
                {user ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-in fade-in">
                        {dict.lessons.context.welcome} {user}!
                    </span>
                ) : (
                    <span className="text-slate-500 italic">Guest User</span>
                )}
            </div>
            
            <button
                onClick={user ? logout : login}
                className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${user
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                    }`}
            >
                {user ? dict.lessons.context.logout : dict.lessons.context.login}
            </button>
        </div>
    );
}
