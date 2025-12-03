import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import { convertPersianToEnglishDigits } from '../constants';

interface EditModalProps {
  isOpen: boolean;
  transaction: Transaction;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, transaction, onClose, onSave }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setDescription(transaction.description);
      setDate(transaction.date); // transaction.date is already in ISO YYYY-MM-DD
      setType(transaction.type);
    }
  }, [transaction]);

  const isValidAmount = useMemo(() => {
    const parsed = parseFloat(amount);
    return !isNaN(parsed) && parsed > 0;
  }, [amount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount || !date) return;

    onSave({
      ...transaction,
      amount: parseFloat(amount),
      description: description.trim(),
      date,
      type: type
    });
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h3 className="text-lg font-semibold text-slate-100">ویرایش تراکنش</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-2">نوع تراکنش</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  واریزی
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  برداشت
                </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${theme.textColor}`}>مبلغ</label>
              <input
                type="text"
                inputMode="numeric"
                value={formattedAmount}
                onChange={handleAmountChange}
                className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-lg font-bold text-slate-100 focus:outline-none focus:ring-2 focus:border-transparent text-left ${isValidAmount ? theme.border : 'border-slate-700'} ${theme.focusRing}`}
                dir="ltr"
                required
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
              className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:border-transparent ${theme.focusRing}`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl transition-colors font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={!isValidAmount}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
               ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};