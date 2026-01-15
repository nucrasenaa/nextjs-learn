'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FramerMotionPage() {
    const { dict } = useLanguage();
    const t = dict.lessons.framerMotion;

    // Layout Animation State
    const [items, setItems] = useState([
        { id: 1, color: 'bg-red-500' },
        { id: 2, color: 'bg-blue-500' },
        { id: 3, color: 'bg-green-500' },
    ]);

    const shuffleItems = () => {
        setItems([...items].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="space-y-16">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            {/* 1. Basic Animation */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-purple-500 pl-4">{t.basicTitle}</h2>
                <p className="text-slate-400">{t.basicDesc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-slate-800/50 p-12 rounded-2xl border border-slate-700 flex items-center justify-center min-h-[300px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ 
                                duration: 1.5, 
                                ease: "backOut",
                                repeat: Infinity,
                                repeatType: "reverse",
                                repeatDelay: 1
                            }}
                            className="w-32 h-32 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                        />
                    </div>
                    <CodeBlock 
                        title="BasicMotion.tsx"
                        code={`<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  className="w-32 h-32 bg-purple-500"
/>`}
                    />
                </div>
            </section>

            {/* 2. Gestures */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-pink-500 pl-4">{t.gestureTitle}</h2>
                <p className="text-slate-400">{t.gestureDesc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-slate-800/50 p-12 rounded-2xl border border-slate-700 flex items-center justify-center min-h-[200px]">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-8 py-4 bg-pink-600 text-white font-bold rounded-xl shadow-lg border border-pink-400/20"
                        >
                            Hover & Click Me!
                        </motion.button>
                    </div>
                    <CodeBlock 
                        title="Gestures.tsx"
                        code={`<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Click Me
</motion.button>`}
                    />
                </div>
            </section>

             {/* 3. Layout Animations */}
             <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-green-500 pl-4">{t.layoutTitle}</h2>
                <p className="text-slate-400">{t.layoutDesc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                        <button 
                            onClick={shuffleItems}
                            className="mb-6 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors w-full"
                        >
                            🔀 {t.shuffle}
                        </button>
                        <div className="space-y-2">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout // The magic prop!
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                    className={`p-4 rounded-xl flex items-center justify-between ${item.color} shadow-lg`}
                                >
                                    <span className="font-bold text-white">{t.box} {item.id}</span>
                                    <span className="text-white/50 text-xs">layout prop attached</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <CodeBlock 
                        title="LayoutAnimation.tsx"
                        code={`// When the order changes, Framer Motion
// automatically animates the position!

{items.map(item => (
  <motion.div
    key={item.id}
    layout 
    transition={{ type: "spring" }}
  >
    {item.content}
  </motion.div>
))}`}
                />
                </div>
            </section>
        </div>
    );
}
