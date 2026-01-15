'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function ServerActionsPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.serverActions;
    const [response, setResponse] = useState<string | null>(null);

    // In a real app, this would be in a separate file like 'actions.ts' marked with "use server"
    // Since we are in a "use client" page for learning, we simulate the effect.
    const simulateServerAction = async (formData: FormData) => {
        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Process "server side"
        const message = formData.get('message');
        setResponse(`${t.success} "${message}" (Processed at ${new Date().toLocaleTimeString()})`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                    <h2 className="text-2xl font-semibold text-red-400 mb-4">{t.formTitle}</h2>
                    <p className="text-slate-400 mb-6">{t.desc}</p>

                    <form action={simulateServerAction} className="space-y-4 bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">{t.label}</label>
                            <input
                                name="message"
                                required
                                placeholder={t.placeholder}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-red-500 text-white"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-500/20"
                        >
                            {t.btn}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg animate-pulse-fade-in">
                            {response}
                        </div>
                    )}
                </section>

                <CodeBlock
                    title="actions.ts (Server Code)"
                    code={`'use server';

export async function submitMessage(formData: FormData) {
  const message = formData.get('message');
  
  // Save to DB directly
  await db.messages.create({ text: message });
  
  // Revalidate cache to update UI
  revalidatePath('/messages');
}`}
                />
            </div>
        </div>
    );
}
