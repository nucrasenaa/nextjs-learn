'use client';

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

// --- 1. Create Slice (Redux Toolkit) ---
// In a real app, this would be in 'features/counterSlice.ts'
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
        reset: (state) => { state.value = 0; },
    },
});

const { increment, decrement, reset } = counterSlice.actions;

// --- 1.2 User Slice (For Global State Demo) ---
const userSlice = createSlice({
    name: 'user',
    initialState: { name: 'Guest', role: 'Visitor' },
    reducers: {
        updateProfile: (state, action) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
        }
    }
});
const { updateProfile } = userSlice.actions;

// --- 2. Create Store ---
// In a real app, this would be in 'store.ts'
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer
    },
});

// Define RootState type for TypeScript
type RootState = ReturnType<typeof store.getState>;

// --- 3. Create Component using Hooks ---
function CounterInfo() {
    const count = useSelector((state: RootState) => state.counter.value);
    const { dict } = useLanguage();
    return (
        <span className="text-6xl font-black text-white mb-6 tabular-nums animate-fade-in">
            {count}
        </span>
    );
}

function CounterControls() {
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

// --- 4. User Components (Global State Demo) ---
function UserCard() {
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

function UserEditor() {
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

export default function ReduxPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.stateRedux;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Concept & Pros/Cons */}
                <div className="space-y-8">
                    <section className="bg-slate-800/30 p-6 rounded-2xl border border-purple-500/30">
                        <h2 className="text-xl font-semibold text-purple-400 mb-2">{t.concept}</h2>
                        <p className="text-slate-400 mb-4">{t.conceptDesc}</p>
                        <div className="bg-black/40 p-4 rounded-lg text-xs font-mono text-slate-300 border border-slate-700">
                            UI --(dispatch)--&gt; Action --(Reducer)--&gt; Store --(Provider)--&gt; UI
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                            <h3 className="text-emerald-400 font-bold mb-2">Pros</h3>
                            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                {t.pros.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                        <section className="bg-rose-900/10 p-4 rounded-xl border border-rose-500/20">
                            <h3 className="text-rose-400 font-bold mb-2">Cons</h3>
                            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                {t.cons.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Demo */}
                <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <h2 className="text-2xl font-semibold text-white mb-4">{t.demoTitle}</h2>
                    <p className="text-slate-400 mb-6">{t.demoDesc}</p>

                    <Provider store={store}>
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 mb-6">
                            <span className="text-slate-500 text-sm uppercase tracking-widest mb-2">{t.value}</span>
                            <CounterInfo />
                            <CounterControls />
                        </div>
                    </Provider>

                    <CodeBlock
                        title="RealRedux.tsx"
                        code={`// 1. Setup Slice (Reducer + Actions)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: s => { s.value += 1 },
    decrement: s => { s.value -= 1 },
    reset: s => { s.value = 0 }
  }
});
const { increment, decrement, reset } = counterSlice.actions;

// 2. Create Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// 3. Connect to UI (Components)
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}

// 4. Wrap App
<Provider store={store}>
  <Counter />
</Provider>`}
                    />
                </section>
            </div>
            {/* Example 2: Global User State */}
            <section className="border-t border-slate-700 pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-white mb-2">{t.globalTitle}</h2>
                <p className="text-slate-400 mb-8 max-w-2xl">{t.globalDesc}</p>

                <Provider store={store}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Component A: Admin Panel (Update) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center text-xs font-bold">A</div>
                                <h3 className="text-lg font-bold text-slate-300">Component A: Admin Panel</h3>
                            </div>
                            <UserEditor />
                        </div>

                        {/* Component B: User Card (Display) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-xs font-bold">B</div>
                                <h3 className="text-lg font-bold text-slate-300">Component B: User Card</h3>
                            </div>
                            <UserCard />
                            <p className="text-xs text-slate-500 mt-2">
                                * {t.note || 'Observation: When Component A updates, Component B reflects changes instantly without props.'}
                            </p>
                        </div>
                    </div>
                </Provider>
            </section>
        </div>
    );
}
