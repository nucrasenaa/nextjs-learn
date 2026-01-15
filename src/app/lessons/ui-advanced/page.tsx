'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for Design System ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Reusable Component Example ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

function Button({ className, variant = 'primary', ...props }: ButtonProps) {
    const baseStyles = "px-6 py-2 rounded-lg font-bold transition-all duration-200 active:scale-95";
    const variants = {
        primary: "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]",
        secondary: "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600",
        ghost: "bg-transparent text-cyan-400 hover:bg-cyan-500/10",
    };

    return (
        <button 
            className={cn(baseStyles, variants[variant], className)}
            {...props} 
        />
    );
}

export default function AdvancedUIPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.uiAdvanced;

    return (
        <div className="space-y-16">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* 1. Glassmorphism */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-cyan-500 pl-4">{t.glassTitle}</h2>
                <p className="text-slate-400">{t.glassDesc}</p>
                
                <div className="relative h-80 rounded-3xl overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
                   
                    {/* The Glass Card */}
                    <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-2">Glass Effect</h3>
                        <p className="text-white/80 text-sm">
                            Created with <code className="bg-black/30 px-1 rounded">backdrop-blur-md</code> and <code className="bg-black/30 px-1 rounded">bg-white/10</code>.
                        </p>
                    </div>

                </div>

                <CodeBlock 
                    title="GlassCard.tsx"
                    code={`<div className="
  bg-white/10        /* 10% opacity white */
  backdrop-blur-md   /* Blur background behind */
  border border-white/20 
  shadow-xl
  rounded-2xl
  p-8
">
  <h1>Glass Effect</h1>
</div>`}
                />
            </section>

            {/* 2. Group & Peer */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-pink-500 pl-4">{t.trickTitle}</h2>
                <p className="text-slate-400">{t.trickDesc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Group Example */}
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center gap-4">
                        <div className="group cursor-pointer bg-slate-700 hover:bg-pink-600 p-6 rounded-xl transition-all duration-300 text-center w-full max-w-xs">
                            <h3 className="text-white font-bold text-lg mb-2">{t.hoverMe}</h3>
                            <p className="text-slate-400 group-hover:text-white transition-colors">
                                {t.imChild}
                            </p>
                            <div className="mt-4 w-10 h-10 bg-black/20 rounded-full mx-auto group-hover:scale-125 group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                                🚀
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Parent has `group`, children have `group-hover:...`</p>
                    </div>

                     {/* Peer Example */}
                     <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" id="peer-demo" className="peer hidden" />
                            
                            <label 
                                htmlFor="peer-demo" 
                                className="w-6 h-6 border-2 border-slate-500 rounded cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors flex items-center justify-center text-transparent peer-checked:text-white select-none"
                            >
                                ✓
                            </label>
                            
                            <span className="text-slate-500 peer-checked:text-green-400 peer-checked:line-through transition-colors select-none">
                                {t.checkMe}
                            </span>
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-700 opacity-0 peer-checked:opacity-100 peer-checked:-translate-y-2 transition-all duration-300">
                             🎉 {t.imPeer}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <CodeBlock 
                        title="GroupExample.tsx"
                        code={`<div className="group hover:bg-pink-500 ...">
  <h3>Parent</h3>
  {/* Child reacts to Parent Hover */}
  <p className="group-hover:text-white">
    I am Child
  </p>
</div>`}
                    />
                     <CodeBlock 
                        title="PeerExample.tsx"
                        code={`<input type="checkbox" className="peer" />

{/* Sibling reacts to Input State */}
<span className="peer-checked:line-through peer-checked:text-green-500">
  Task Name
</span>`}
                    />
                </div>
            </section>

             {/* 3. Design System */}
             <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-indigo-500 pl-4">{t.designTitle}</h2>
                <p className="text-slate-400">{t.designDesc}</p>
                
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-wrap gap-4 items-center justify-center">
                    <Button variant="primary">{t.btnPrimary}</Button>
                    <Button variant="secondary">{t.btnSecondary}</Button>
                    <Button variant="ghost">{t.btnGhost}</Button>
                    <Button variant="primary" className="bg-purple-500 hover:bg-purple-400 hover:shadow-purple-500/50">
                        Custom Class Overlay
                    </Button>
                </div>

                <CodeBlock 
                        title="ReusableButton.tsx"
                        code={`import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Button({ className, variant, ...props }) {
  const variants = {
    primary: "bg-cyan-500 text-black",
    secondary: "bg-slate-700 text-white",
  };

  return (
    <button className={cn(
       "px-4 py-2 rounded", // Base styles
       variants[variant],   // Variant styles
       className            // Custom overrides
    )} {...props} />
  );
}`}
                />
            </section>
        </div>
    );
}
