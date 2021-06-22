import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import { apiGetExpenses, IExpenses } from '../services/apiServices';
import { formatValue } from '../utils/formatValue';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    maxWidth: '90%',
    margin: '0 auto',
  },
});

interface IExpensesTableProps {
  setTotal: (total: string) => void;
}

const ExpensesTable = (props: IExpensesTableProps) => {
  const { setTotal } = props;
  const { date } = useParams<{ date: string }>();
  const classes = useStyles();
  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  useEffect(() => {
    async function loadExpenses() {
      const [currentYear, currentMonth] = date.split('-');
      const allExpenses = await apiGetExpenses(currentYear, currentMonth);

      let total: number = 0;

      allExpenses.forEach(e => (total += e.valor));

      setTotal(formatValue(total));

      setExpenses(allExpenses);
    }
    loadExpenses();
  }, [date, setTotal]);

  return (
    <TableContainer component="div">
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="right">Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(({ descricao, categoria, dia, id, valorFormatado }) => (
            <TableRow key={id}>
              <TableCell>{descricao}</TableCell>
              <TableCell>{categoria}</TableCell>
              <TableCell align="center">{dia}</TableCell>
              <TableCell align="right">{valorFormatado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
