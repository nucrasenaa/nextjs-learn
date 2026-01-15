export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse p-8 bg-slate-800/50 rounded-3xl border border-slate-700">
            <div className="h-10 bg-slate-700 rounded-lg w-1/3"></div>
            <div className="space-y-3">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-700 rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="h-20 bg-slate-700 rounded-xl"></div>
                <div className="h-20 bg-slate-700 rounded-xl"></div>
                <div className="h-20 bg-slate-700 rounded-xl"></div>
            </div>
            <div className="flex justify-center pt-8">
                <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
