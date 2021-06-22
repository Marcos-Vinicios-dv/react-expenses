import { IApiData, read } from './httpServices';
import { formatValue } from '../utils/formatValue';

export interface IYears {
  year: string;
}

export interface IExpenses extends IApiData {
  valorFormatado: string;
}

export async function apiGetYear(): Promise<IYears[]> {
  const data = await read('despesas');
  let allYears: IYears[] = [];
  for (const expense of data) {
    const [onlyYear] = expense.mes.split('-');
    const yearExists = allYears.find(y => y?.year === onlyYear);

    if (!yearExists) {
      allYears.push({ year: onlyYear });
    }
  }
  return allYears;
}

export async function apiGetExpenses(
  year: string,
  month: string
): Promise<IExpenses[]> {
  const allExpenses = await read(`/despesas?mes=${year}-${month}&_sort=dia`);
  return allExpenses.map(e => ({ ...e, valorFormatado: formatValue(e.valor) }));
}
