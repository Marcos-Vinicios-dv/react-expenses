import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface IApiData {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export async function read(url: string): Promise<IApiData[]> {
  const { data } = await api.get(url);
  return data;
}
