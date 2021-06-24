import { formatValue } from '../utils/formatValue';
import { api } from './httpServices';

export interface IExpensesData {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IYears {
  year: string;
}

export interface IExpenses extends IExpensesData {
  valorFormatado: string;
}

export interface IUser {
  email: string;
  nome: string;
}

export async function apiGetYear(): Promise<IYears[]> {
  const { data } = await api.get('despesas');
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
  const { data } = await api.get<IExpenses[]>(
    `/despesas?mes=${year}-${month}&_sort=dia`
  );
  return data.map(e => ({ ...e, valorFormatado: formatValue(e.valor) }));
}

export const apiSignIn = async (
  email: string,
  senha: string
): Promise<IUser> => {
  const data = JSON.stringify({
    email,
    senha,
  });
  return api
    .post('/sessao/criar', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.data);
};

export const apiGetUsers = async (): Promise<IUser> => {
  const { data } = await api.get<IUser>('/sessao/usuario');
  return data;
};

export const apiSignOut = async () => {
  api.post('sessao/finalizar');
};
