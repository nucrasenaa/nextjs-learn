'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateProfile } from './store';
import { useLanguage } from '@/context/LanguageContext';

export function UserCard() {
    const user = useSelector((state: RootState) => state.user);
    const { dict } = useLanguage();
    const t = dict.lessons.stateRedux;

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
                {user.name.charAt(0)}
            </div>
            <div>
                <p className="text-sm text-blue-400 font-bold uppercase tracking-wider">{t.cardTitle}</p>
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.role}</p>
            </div>
        </div>
    );
}

export function UserEditor() {
    const dispatch = useDispatch();
    const { dict } = useLanguage();
    const t = dict.lessons.stateRedux;

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('username') as HTMLInputElement).value;
        const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
        dispatch(updateProfile({ name, role }));
        form.reset();
    };

    return (
        <form onSubmit={handleUpdate} className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">{t.editTitle}</p>
            <div className="space-y-2">
                <input
                    name="username"
                    placeholder={t.userName}
                    className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                />
                <select
                    name="role"
                    className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                    <option value="Visitor">Visitor</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                </select>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all">
                {t.updateProfile}
            </button>
        </form>
    );
}
