import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { apiGetYear, IYears } from '../services/apiServices';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

interface IExpensesHeaderProps {
  total: string;
}

const ExpensesHeader = (props: IExpensesHeaderProps) => {
  const { total } = props;
  const [years, setYears] = useState<IYears[]>([]);
  const [valueYear, setValueYear] = useState<string>('2021');
  const [valueMonth, setValueMonth] = useState<string>('01');

  const history = useHistory();

  useEffect(() => {
    async function loadYears() {
      const allYears = await apiGetYear();
      setYears(allYears);
    }
    loadYears();
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="10px"
      style={{ backgroundColor: '#EB786E' }}
    >
      <Box display="flex" alignItems="center" minWidth="400px">
        <FormControl fullWidth>
          <InputLabel id="select-ano" style={{ color: 'white' }}>
            Ano
          </InputLabel>
          <Select
            labelId="select-ano"
            value={valueYear}
            onChange={evt => {
              setValueYear(evt.target.value as string);
              history.push(`${evt.target.value as string}-${valueMonth}`);
            }}
          >
            {years.map(({ year }, i) => (
              <MenuItem key={i} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginLeft: '10px' }}>
          <InputLabel id="select-mes" style={{ color: 'white' }}>
            Mês
          </InputLabel>
          <Select
            labelId="select-mes"
            value={valueMonth}
            onChange={evt => {
              setValueMonth(evt.target.value as string);
              history.push(`${valueYear}-${evt.target.value as string}`);
            }}
          >
            {MONTHS.map((month, i) => (
              <MenuItem key={i} value={(i + 1).toString().padStart(2, '0')}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="span" color="#fff">
        <strong>Despesas Total: </strong>
        {total}
      </Box>
    </Box>
  );
};

export default ExpensesHeader;
