
import React from 'react';
import { Transaction } from '../types';
import { TransactionList } from '../components/TransactionList';

interface HistoryProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
    onEdit: (transaction: Transaction) => void;
}

export const History: React.FC<HistoryProps> = ({ transactions, onDelete, onEdit }) => {
    return (
        <section>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[500px]">
             <h2 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              تاریخچه تراکنش‌ها
            </h2>
            <TransactionList 
              transactions={transactions} 
              onDelete={onDelete} 
              onEdit={onEdit}
            />
          </div>
        </section>
    );
}