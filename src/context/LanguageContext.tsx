'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionary, Language } from '@/lib/dictionary';

// Define the shape of the context
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dict: typeof dictionary['th']; // Type based on Thai (default) structure
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('th');

    const value = {
        language,
        setLanguage,
        dict: dictionary[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook for easier usage
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
