import { useEffect, useState } from 'react';
import { apiGetExpenses, IExpenses } from '../services/apiServices';

export interface IUseExpense {
  expenses: IExpenses[];
  totalExpenses: number;
  totalByCategory: ITotalByCategory[];
}

export interface ITotalByCategory {
  total: number;
  category: string;
}

const useExpense = (date: string): IUseExpense => {
  const [expenses, setExpenses] = useState<IExpenses[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalByCategory, setTotalByCategory] = useState<
    ITotalByCategory[] | []
  >([]);

  useEffect(() => {
    async function loadExpenses() {
      const [currentYear, currentMonth] = date.split('-');
      const allExpenses = await apiGetExpenses(currentYear, currentMonth);
      setExpenses(allExpenses);
      setTotalExpenses(
        allExpenses.reduce((acc: number, { valor }) => {
          return acc + valor;
        }, 0)
      );
    }
    loadExpenses();
  }, [date]);

  useEffect(() => {
    const categories: string[] = [];
    expenses.forEach(e => {
      if (!categories.find(cat => cat === e.categoria)) {
        categories.push(e.categoria);
      }
    });
    const total: ITotalByCategory[] = categories.map(cat => {
      const allForCategory = expenses.filter(
        expense => expense.categoria === cat
      );
      const total = allForCategory.reduce((acc: number, { valor }) => {
        return acc + valor;
      }, 0);
      return { category: cat, total };
    });

    setTotalByCategory(total);
  }, [expenses]);

  return {
    expenses,
    totalExpenses,
    totalByCategory,
  };
};

export default useExpense;
