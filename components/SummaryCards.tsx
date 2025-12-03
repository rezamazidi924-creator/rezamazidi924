
import React, { useState, useEffect, useRef } from 'react';
import { SummaryStats } from '../types';
import { formatCurrency, toPersianNumber } from '../constants';

interface SummaryCardsProps {
  stats: SummaryStats;
  initialBalance: number;
  onUpdateInitialBalance: (newBalance: number) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ stats, initialBalance, onUpdateInitialBalance }) => {
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [editedBalanceValue, setEditedBalanceValue] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsEditingBalance(false);
      }
    };
    if (isEditingBalance) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingBalance]);

  const handleEditClick = () => {
    setEditedBalanceValue(initialBalance.toString());
    setIsEditingBalance(true);
  };

  const handleSaveClick = () => {
    const newBalance = parseFloat(editedBalanceValue);
    if (!isNaN(newBalance)) {
      onUpdateInitialBalance(newBalance);
    }
    setIsEditingBalance(false);
  };
  
  const handleCancelClick = () => {
    setIsEditingBalance(false);
  };

  const handleBalanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^۰-۹0-9]/g, '');
    const englishValue = rawValue.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    setEditedBalanceValue(englishValue);
  };
  
  const formattedEditedBalance = editedBalanceValue === '' ? '' : new Intl.NumberFormat('fa-IR').format(Number(editedBalanceValue));

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 shadow-lg shadow-indigo-900/30">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-indigo-100 text-sm font-medium">موجودی کل</h3>
              <button onClick={handleEditClick} title="ویرایش موجودی اولیه" className="text-indigo-200 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
              </button>
            </div>
            <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1 mt-1" dir="ltr">
              <span className="text-lg opacity-70">تومان</span>
              {formatCurrency(stats.balance)}
            </div>
          </div>
          <div className="mt-1 text-xs text-indigo-200 bg-indigo-900/40 inline-block px-2 py-1 rounded-full">
            وضعیت: {stats.balance >= 0 ? 'تراز مثبت' : 'تراز منفی'}
          </div>
        </div>

        {/* Floating Edit Popover */}
        {isEditingBalance && (
          <div 
            ref={popoverRef}
            className="absolute top-14 right-6 z-10 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 animate-fade-in-down"
          >
            <label className="block text-xs text-slate-400 mb-1">تنظیم موجودی اولیه</label>
            <input
              type="text"
              inputMode="numeric"
              value={formattedEditedBalance}
              onChange={handleBalanceInputChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white/50 text-left transition-all"
              dir="ltr"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveClick()}
            />
            <div className="flex gap-2 mt-3">
              <button onClick={handleCancelClick} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">انصراف</button>
              <button onClick={handleSaveClick} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">ذخیره</button>
            </div>
            <style>{`
              @keyframes fade-in-down {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
            `}</style>
          </div>
        )}
      </div>
  );
};