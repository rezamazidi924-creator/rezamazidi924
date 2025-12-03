export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string; // ISO string YYYY-MM-DD
  type: TransactionType;
  createdAt: number; // timestamp for sorting
}

export interface SummaryStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
