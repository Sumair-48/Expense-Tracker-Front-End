import { useState, useEffect } from 'react';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock initial data
  useEffect(() => {
    const mockExpenses: Expense[] = [
      {
        id: '1',
        title: 'Grocery Shopping',
        amount: 85.50,
        category: 'Food',
        date: '2024-01-15',
        notes: 'Weekly groceries'
      },
      {
        id: '2',
        title: 'Gas Station',
        amount: 45.00,
        category: 'Transport',
        date: '2024-01-14',
        notes: 'Fuel for car'
      },
      {
        id: '3',
        title: 'Movie Tickets',
        amount: 25.00,
        category: 'Entertainment',
        date: '2024-01-13',
        notes: 'Cinema with friends'
      },
      {
        id: '4',
        title: 'Phone Bill',
        amount: 65.00,
        category: 'Bills',
        date: '2024-01-12',
        notes: 'Monthly phone payment'
      },
      {
        id: '5',
        title: 'Online Course',
        amount: 120.00,
        category: 'Education',
        date: '2024-01-10',
        notes: 'Web development course'
      }
    ];
    setExpenses(mockExpenses);
  }, []);

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    
    setExpenses(prev => [newExpense, ...prev]);
    setLoading(false);
    return newExpense;
  };

  const updateExpense = async (id: string, updatedExpense: Partial<Expense>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
    setLoading(false);
  };

  const deleteExpense = async (id: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    setLoading(false);
  };

  return {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};