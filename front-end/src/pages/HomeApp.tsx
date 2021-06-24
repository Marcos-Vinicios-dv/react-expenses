import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Header from '../components/Header';
import ExpensesHeader from '../components/ExpensesHeader';
import ExpenseDetails from '../components/ExpenseDetails';
import ExpenseSummary from '../components/ExpenseSummary';
import { useParams } from 'react-router-dom';
import useExpense from '../hooks/useExpense';

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    '& button': {
      color: 'black',
    },
    '& div > span': {
      backgroundColor: '#EB786E',
    },
  },
});

const HomeApp = () => {
  const { date } = useParams<{ date: string }>();
  const { expenses, totalExpenses, totalByCategory } = useExpense(date);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Header />
      <ExpensesHeader total={totalExpenses} />
      <AppBar position="static" className={classes.root}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Tab label="Resumo" />
          <Tab label="Detalhes" />
        </Tabs>
        {value === 1 ? (
          <ExpenseDetails expenses={expenses} />
        ) : (
          <ExpenseSummary totalByCategory={totalByCategory} />
        )}
      </AppBar>
    </>
  );
};

export default HomeApp;
