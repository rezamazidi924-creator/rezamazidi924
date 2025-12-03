
// Fix: Import React. The 'JSX' namespace is made available by importing React, which is required for files containing JSX syntax.
import React from 'react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: 'dashboard' | 'history') => void;
  onAddClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactElement, label: string, isActive: boolean, onClick: () => void }) => (
    <li>
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-colors ${
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
        >
            {icon}
            <span className="font-semibold">{label}</span>
        </button>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onAddClick }) => {
  return (
    <aside className="w-64 bg-slate-900 border-l border-slate-800 h-screen flex flex-col p-4 sticky top-0">
      {/* Logo/Header */}
      <div className="flex items-center gap-3 px-2 py-4 mb-4">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-indigo-400 to-cyan-300">
          حساب شخصی
        </h1>
      </div>

      {/* Add Transaction Button */}
      <div className="px-0 mb-4">
        <button
          onClick={onAddClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>تراکنش جدید</span>
        </button>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
           <NavItem 
                label="خانه"
                isActive={activeView === 'dashboard'}
                onClick={() => onNavigate('dashboard')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
           />
           <NavItem 
                label="تاریخچه تراکنش‌ها"
                isActive={activeView === 'history'}
                onClick={() => onNavigate('history')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
           />
        </ul>
      </nav>

      {/* Footer info */}
      <div className="mt-auto text-center text-xs text-slate-600 p-4">
        <p>&copy; {new Date().getFullYear()} مدیریت حساب شخصی</p>
      </div>
    </aside>
  );
};
