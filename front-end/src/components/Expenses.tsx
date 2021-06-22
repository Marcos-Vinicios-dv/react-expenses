import { useState } from 'react';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from './ExpensesTable';

const Expenses = () => {
  const [total, setTotal] = useState<string>('0');

  return (
    <>
      <ExpensesHeader total={total} />
      <ExpensesTable setTotal={setTotal} />
    </>
  );
};

export default Expenses;
