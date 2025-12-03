import React from 'react';

interface HeaderProps {
    activeView: string;
}

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
    const title = activeView === 'dashboard' ? 'صفحه اصلی' : 'تاریخچه تراکنش‌ها';
    
    return (
        <header className="sticky top-0 z-30 w-full backdrop-blur-lg bg-slate-900/80 border-b border-slate-800">
            <div className="px-6 py-4 flex items-center justify-start">
                 <h1 className="text-xl font-bold text-slate-200">
                    {title}
                 </h1>
            </div>
        </header>
    );
};