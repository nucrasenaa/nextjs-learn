'use client';

import { useSidebar } from '@/context/SidebarContext';
import Navigation from '@/components/Navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <>
            <Navigation />
            <main className={`min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
                <div className="max-w-5xl mx-auto p-8 md:p-12 fade-in">
                    {children}
                </div>
            </main>
        </>
    );
}
