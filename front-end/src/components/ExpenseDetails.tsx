import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IExpenses } from '../services/apiServices';

const useStyles = makeStyles({
  table: {
    maxWidth: '90%',
    margin: '0 auto',
  },
});

interface IExpensesTableProps {
  expenses: IExpenses[];
}

const ExpenseDetails = (props: IExpensesTableProps) => {
  const { expenses } = props;
  const classes = useStyles();

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

export default ExpenseDetails;
