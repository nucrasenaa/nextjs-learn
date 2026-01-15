'use client';

import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';

export default function CSSAnimationPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.cssAnimation;

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* Hover & Transitions */}
            <section className="bg-slate-800/30 p-8 rounded-3xl border border-violet-500/30">
                <h2 className="text-2xl font-semibold text-violet-400 mb-6">{t.hoverTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            {t.hoverDesc}
                        </p>
                        <CodeBlock
                            title="Button.tsx"
                            code={`<button className="
  px-6 py-3 bg-violet-600 rounded-lg
  transition-all duration-300 ease-in-out
  hover:bg-violet-500 hover:scale-110 hover:-translate-y-1 hover:shadow-xl
  active:scale-95
">
  Hover Me
</button>`}
                        />
                    </div>

                    <div className="flex items-center justify-center h-full min-h-[200px] bg-slate-900 rounded-2xl border border-slate-700">
                        <button className="px-8 py-4 bg-violet-600 rounded-xl text-white font-bold transition-all duration-300 ease-in-out hover:bg-violet-500 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(139,92,246,0.3)] active:scale-95 active:shadow-none">
                            {t.btnHover}
                        </button>
                    </div>
                </div>
            </section>

            {/* Keyframe Animations */}
            <section className="bg-slate-800/30 p-8 rounded-3xl border border-fuchsia-500/30">
                <h2 className="text-2xl font-semibold text-fuchsia-400 mb-6">{t.pulseTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 flex flex-col gap-6">
                        <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-fuchsia-500 rounded-full animate-bounce"></div>
                            <code className="text-fuchsia-300">animate-bounce</code>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-fuchsia-500 rounded-full animate-ping"></div>
                            <code className="text-fuchsia-300">animate-ping</code>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-fuchsia-500 rounded-full animate-pulse"></div>
                            <code className="text-fuchsia-300">animate-pulse</code>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            {t.pulseDesc}
                        </p>
                        <CodeBlock
                            title="LoadingSkeleton.tsx"
                            code={`<div className="animate-pulse flex space-x-4">
  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
  <div className="flex-1 space-y-6 py-1">
    <div className="h-2 bg-slate-700 rounded"></div>
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
      </div>
    </div>
  </div>
</div>`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
