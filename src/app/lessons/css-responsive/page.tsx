'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function CSSResponsivePage() {
    const { dict } = useLanguage();
    const t = dict.lessons.cssResponsive;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-pink-400 mb-4">{t.breakpointsTitle}</h2>
                <p className="text-slate-400 mb-6">{t.breakpointsDesc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                            <h3 className="text-slate-400 font-bold mb-2">Tailwind Code</h3>
                            <code className="block font-mono text-sm text-pink-300">
                                w-full md:w-1/2 lg:w-1/3 <br />
                                bg-red-500 md:bg-yellow-500 lg:bg-green-500
                            </code>
                        </div>
                        <div className="space-y-2 text-sm text-slate-500">
                            <p><strong>sm:</strong> 640px (Phones)</p>
                            <p><strong>md:</strong> 768px (Tablets)</p>
                            <p><strong>lg:</strong> 1024px (Laptops)</p>
                            <p><strong>xl:</strong> 1280px (Desktops)</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-slate-950 p-8 rounded-xl border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-xs text-slate-600 font-mono">Current Simulation</div>

                        {/* Responsive Box */}
                        <div className="
                    w-full md:w-1/2 lg:w-1/3 
                    h-32 
                    bg-red-500 md:bg-yellow-500 lg:bg-green-500 
                    rounded-2xl 
                    flex items-center justify-center 
                    text-slate-900 font-bold text-center p-4
                    transition-all duration-500 ease-in-out
                    shadow-2xl
                ">
                            <div className="block md:hidden lg:hidden">{t.mobile}<br />(bg-red-500)</div>
                            <div className="hidden md:block lg:hidden">{t.tablet}<br />(bg-yellow-500)</div>
                            <div className="hidden lg:block">{t.desktop}<br />(bg-green-500)</div>
                        </div>

                        <p className="mt-4 text-slate-500 text-sm">{t.demoBox}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
