export default function CodeBlock({ code, title }: { code: string; title?: string }) {
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-[#0d1117]">
            {title && (
                <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50 flex items-center">
                    <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{title}</span>
                </div>
            )}
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-slate-300 leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
