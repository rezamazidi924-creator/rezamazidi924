import React from 'react';
import { SummaryStats } from '../types';
import { formatCurrency } from '../constants';

interface DashboardProps {
    stats: SummaryStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
    return (
        <section>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
               <h3 className="text-slate-300 text-sm font-semibold mb-3">گردش حساب</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Income */}
                  <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-slate-400 text-sm">مجموع واریزی</span>
                      </div>
                      <div className="text-lg font-bold text-emerald-400 tracking-tight" dir="ltr">
                          +{formatCurrency(stats.totalIncome)}
                      </div>
                  </div>
                  {/* Expense */}
                  <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                          <span className="text-slate-400 text-sm">مجموع برداشت</span>
                      </div>
                      <div className="text-lg font-bold text-rose-400 tracking-tight" dir="ltr">
                          -{formatCurrency(stats.totalExpense)}
                      </div>
                  </div>
               </div>
          </div>
        </section>
    );
}
