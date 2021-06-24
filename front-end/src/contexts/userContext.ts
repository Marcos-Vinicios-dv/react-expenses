import { createContext } from 'react';

export interface IUserContext {
  user: string;
  onSignOut: () => void;
}

export const userContext = createContext<IUserContext>({
  user: '',
  onSignOut: () => {},
});
