'use client';

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { dict } = useLanguage();

  const topics = [
    {
      ...dict.home.topics[0],
      href: "/lessons/variables",
      color: "from-pink-500 to-rose-500",
    },
    {
      ...dict.home.topics[1],
      href: "/lessons/state",
      color: "from-purple-500 to-indigo-500",
    },
    {
      ...dict.home.topics[2],
      href: "/lessons/effects",
      color: "from-cyan-500 to-blue-500",
    },
    {
      ...dict.home.topics[3],
      href: "/lessons/fetching-fetch",
      color: "from-emerald-500 to-teal-500",
    },
    {
      ...dict.home.topics[4],
      href: "/lessons/fetching-axios",
      color: "from-orange-500 to-amber-500",
    },
    // Advanced
    {
      ...dict.home.topics[5],
      href: "/lessons/routing",
      color: "from-teal-500 to-green-500",
    },
    {
      ...dict.home.topics[6],
      href: "/lessons/rsc",
      color: "from-blue-500 to-indigo-500",
    },
    {
      ...dict.home.topics[7],
      href: "/lessons/server-actions",
      color: "from-red-500 to-orange-500",
    },
    {
      ...dict.home.topics[8],
      href: "/lessons/context",
      color: "from-purple-500 to-pink-500",
    },
    // State Management Advanced
    {
      ...dict.home.topics[12],
      href: "/lessons/state-redux",
      color: "from-purple-600 to-indigo-600",
    },
    {
      ...dict.home.topics[13],
      href: "/lessons/state-zustand",
      color: "from-yellow-400 to-orange-500",
    },
    {
      ...dict.home.topics[14],
      href: "/lessons/workshop-pokemon",
      color: "from-red-600 to-rose-600",
    },
    // UI/CSS
    {
      ...dict.home.topics[9],
      href: "/lessons/css-layout",
      color: "from-blue-400 to-cyan-400",
    },
    {
      ...dict.home.topics[10],
      href: "/lessons/css-responsive",
      color: "from-pink-500 to-rose-500",
    },
    {
      ...dict.home.topics[11],
      href: "/lessons/css-animation",
      color: "from-violet-500 to-fuchsia-500",
    }
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {dict.home.title}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          {dict.home.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link href={topic.href} key={topic.href} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 rounded-2xl"></div>
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${topic.color} opacity-20 blur-xl transition duration-1000 group-hover:opacity-40`}></div>

            <div className="relative h-full bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 transition-colors">
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${topic.color} bg-clip-text text-transparent mb-3`}>
                {topic.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {topic.desc}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {dict.home.start} <span className="ml-2 text-xl">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
