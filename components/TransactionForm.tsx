import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import { generateId, toPersianNumber, convertPersianToEnglishDigits } from '../constants';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(''); // Stores raw numeric string e.g. "50000"
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's Gregorian date in ISO format
  const [type, setType] = useState<TransactionType>('expense');

  const isValidAmount = useMemo(() => {
    const parsed = parseFloat(amount);
    return !isNaN(parsed) && parsed > 0;
  }, [amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount || !date) return;
    
    const newTransaction: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description.trim(),
      date,
      type: type,
      createdAt: Date.now(),
    };

    onSubmit(newTransaction);

    // Reset form
    setAmount('');
    setDescription('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^۰-۹0-9]/g, ''); // Remove non-digits (Persian or English)
    const englishValue = convertPersianToEnglishDigits(rawValue); // Convert any remaining Persian digits to English
    setAmount(englishValue);
  };
  
  const formattedAmount = amount === '' ? '' : new Intl.NumberFormat('fa-IR').format(Number(amount));

  const theme = {
    color: type === 'income' ? 'emerald' : 'rose',
    textColor: type === 'income' ? 'text-emerald-400' : 'text-rose-400',
    focusRing: type === 'income' ? 'focus:ring-emerald-500' : 'focus:ring-rose-500',
    border: type === 'income' ? 'border-emerald-500/50' : 'border-rose-500/50',
    buttonBg: type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700',
    buttonShadow: type === 'income' ? 'shadow-emerald-500/30' : 'shadow-rose-500/30',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div>
        <label className="block text-xs text-slate-400 mb-2 font-medium">نوع تراکنش</label>
        <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              واریزی
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              برداشت
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-medium mb-1 ${theme.textColor}`}>مبلغ (تومان)</label>
          <input
            type="text"
            inputMode="numeric"
            value={formattedAmount}
            onChange={handleAmountChange}
            placeholder="۰"
            className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-lg font-bold text-slate-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-600 text-left ${isValidAmount ? theme.border : 'border-slate-700'} ${theme.focusRing}`}
            dir="ltr"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1">تاریخ</label>
          {/* Fix: Use theme.border and theme.focusRing instead of undefined variables. */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-base text-slate-100 focus:outline-none focus:ring-2 transition-all appearance-none ${theme.border || 'border-slate-700'} ${theme.focusRing || 'focus:ring-indigo-500'}`}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-slate-400 font-medium mb-1">توضیحات (اختیاری)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="مثلاً خرید سوپرمارکت"
          className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-slate-600 ${theme.focusRing}`}
        />
      </div>

      <button
        type="submit"
        disabled={!isValidAmount}
        className={`w-full font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed ${isValidAmount ? `${theme.buttonBg} text-white ${theme.buttonShadow}` : 'bg-slate-700 text-slate-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
        </svg>
        <span>ثبت تراکنش</span>
      </button>
    </form>
  );
};