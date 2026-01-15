'use client';

import { Provider } from 'react-redux';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { store } from './store';
import { CounterInfo, CounterControls } from './Counter';
import { UserCard, UserEditor } from './UserProfile';

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
                </section>
            </div>

            {/* Split Code View */}
            <div className="mt-8 space-y-8">
                <p className="text-slate-300 border-b border-slate-700 pb-4">
                    {t.splitTitle}
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* 1. Store & Logic */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs text-center border border-purple-500/30">1</span>
                            Store & Slice
                        </h3>
                        <CodeBlock
                            title={t.fileStore}
                            code={`import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: s => { s.value += 1 },
    decrement: s => { s.value -= 1 },
    reset: s => { s.value = 0 }
  }
});
export const { increment, decrement, reset } = counterSlice.actions;

// 2. Configure Store
export const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});`}
                        />
                    </div>

                    {/* 2. Consumer */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs text-center border border-pink-500/30">2</span>
                            Components
                        </h3>
                        <CodeBlock
                            title={t.fileCounter}
                            code={`'use client';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './store';

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}`}
                        />
                    </div>

                    {/* 3. Page Provider */}
                    <div className="col-span-1 xl:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs text-center border border-teal-500/30">3</span>
                            Usage in Page
                        </h3>
                        <CodeBlock
                            title={t.filePage}
                            code={`'use client';
import { Provider } from 'react-redux';
import { store } from './store';
import { Counter } from './Counter';

export default function Page() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`}
                        />
                    </div>
                </div>
            </div>

            {/* Example 2: Global User State */}
            <section className="border-t border-slate-700 pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-white mb-2">{t.globalTitle}</h2>
                <p className="text-slate-400 mb-8 max-w-2xl">{t.globalDesc}</p>

                <Provider store={store}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
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
                
                {/* User Code View */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-8 border-t border-slate-700/50">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs text-center border border-orange-500/30">4</span>
                            User Slice (store.ts)
                        </h3>
                        <CodeBlock
                            title={t.fileUserSlice}
                            code={`// src/app/lessons/state-redux/store.ts
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
export const { updateProfile } = userSlice.actions;`}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs text-center border border-blue-500/30">5</span>
                            Components (UserProfile.tsx)
                        </h3>
                        <CodeBlock
                            title={t.fileUserComponents}
                            code={`// src/app/lessons/state-redux/UserProfile.tsx
export function UserCard() {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.role}</p>
        </div>
    );
}

export function UserEditor() {
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        // ... get name & role from form
        dispatch(updateProfile({ name, role }));
    };
    return (
        <form onSubmit={handleUpdate}>
           {/* Inputs... */}
        </form>
    );
}`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
