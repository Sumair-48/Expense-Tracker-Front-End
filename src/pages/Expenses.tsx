import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import FilterBar from '../components/FilterBar';
import { Plus } from 'lucide-react';

const Expenses = () => {
  const { expenses, loading, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    search: '',
  });

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    if (filters.category && expense.category !== filters.category) return false;
    if (filters.startDate && expense.date < filters.startDate) return false;
    if (filters.endDate && expense.date > filters.endDate) return false;
    if (filters.search && !expense.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleAddExpense = async (expenseData: any) => {
    await addExpense(expenseData);
    setIsFormOpen(false);
  };

  const handleEditExpense = async (expenseData: any) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expenses</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your expense transactions</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </button>
      </div>

      <FilterBar filters={filters} onFiltersChange={setFilters} categories={categories} />

      <div className="mt-8">
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={setEditingExpense}
          onDelete={handleDeleteExpense}
          loading={loading}
        />
      </div>

      {(isFormOpen || editingExpense) && (
        <ExpenseForm
          expense={editingExpense}
          categories={categories}
          onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingExpense(null);
          }}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Expenses;