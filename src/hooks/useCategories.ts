import { useState, useEffect } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const defaultCategories = [
      'Food',
      'Transport',
      'Shopping',
      'Bills',
      'Entertainment',
      'Health',
      'Education',
      'Others'
    ];
    
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
  }, []);

  const addCategory = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName && !categories.some(cat => 
      cat.toLowerCase() === trimmedName.toLowerCase()
    )) {
      const updatedCategories = [...categories, trimmedName];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return true;
    }
    return false;
  };

  const deleteCategory = (name: string) => {
    const updatedCategories = categories.filter(cat => cat !== name);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  return {
    categories,
    addCategory,
    deleteCategory,
  };
};