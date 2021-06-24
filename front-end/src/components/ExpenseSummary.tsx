import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ITotalByCategory } from '../hooks/useExpense';
import { formatValue } from '../utils/formatValue';

interface IExpenseSummaryProps {
  totalByCategory: ITotalByCategory[];
}

const useStyles = makeStyles({
  table: {
    maxWidth: '90%',
    margin: '0 auto',
  },
});

const ExpenseSummary = (props: IExpenseSummaryProps) => {
  const { totalByCategory } = props;

  const classes = useStyles();
  return (
    <TableContainer component="div">
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalByCategory.map(({ category, total }, i) => (
            <TableRow key={i}>
              <TableCell>{category}</TableCell>
              <TableCell align="right">{formatValue(total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseSummary;
