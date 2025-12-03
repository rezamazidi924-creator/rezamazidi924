import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction, SummaryStats } from './types';
import { SummaryCards } from './components/SummaryCards';
import { EditModal } from './components/EditModal';
import { AddTransactionModal } from './components/AddTransactionModal';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';


const TRANSACTIONS_STORAGE_KEY = 'finance_app_transactions_v2';
const INITIAL_BALANCE_KEY = 'finance_app_initial_balance_v1';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeView, setActiveView] = useState('dashboard');

  // Load from local storage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
    const savedBalance = localStorage.getItem(INITIAL_BALANCE_KEY);
    if (savedBalance) {
      try {
        setInitialBalance(parseFloat(savedBalance) || 0);
      } catch (e) {
        console.error("Failed to parse initial balance", e);
      }
    }
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(INITIAL_BALANCE_KEY, initialBalance.toString());
  }, [initialBalance]);


  // Real-time calculation using useMemo for high performance
  const stats: SummaryStats = useMemo(() => {
    const { totalIncome, totalExpense } = transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.totalIncome += curr.amount;
        } else {
          acc.totalExpense += curr.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
    
    const balance = initialBalance + totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions, initialBalance]);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
    setIsAddModalOpen(false); // Close modal on submit
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const openEditModal = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditingTransaction(null);
    setIsEditModalOpen(false);
  }, []);
  
  const openAddModal = useCallback(() => setIsAddModalOpen(true), []);
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);

  const updateTransaction = useCallback((updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    closeEditModal();
  }, [closeEditModal]);

  const updateInitialBalance = useCallback((newBalance: number) => {
    if (!isNaN(newBalance)) {
      setInitialBalance(newBalance);
    }
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'history':
        return <History transactions={transactions} onDelete={deleteTransaction} onEdit={openEditModal} />;
      default:
        return <Dashboard stats={stats} />;
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar activeView={activeView} onNavigate={setActiveView} onAddClick={openAddModal} />
      
      <div className="flex-1 flex flex-col h-screen">
        <Header activeView={activeView} />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
            <SummaryCards 
              stats={stats} 
              initialBalance={initialBalance}
              onUpdateInitialBalance={updateInitialBalance}
            />
            {renderContent()}
        </main>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={addTransaction}
      />

      {/* Edit Transaction Modal */}
      {isEditModalOpen && editingTransaction && (
        <EditModal 
          isOpen={isEditModalOpen} 
          transaction={editingTransaction} 
          onClose={closeEditModal} 
          onSave={updateTransaction} 
        />
      )}
    </div>
  );
};

export default App;