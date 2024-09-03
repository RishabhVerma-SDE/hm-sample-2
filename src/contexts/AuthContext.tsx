'use client';

import { ReactNode, createContext, useContext, useReducer } from 'react';

export type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

export type CountContextType = {
  userState: UserState;
  updateUserState: React.Dispatch<Action>;
};

const AuthContext = createContext<CountContextType | undefined>(undefined);

export type UserState = {
  isLoggedIn?: boolean;
  isAuthenticated?: boolean;
  email?: string;
  token?: string;
  count: number;
};

const initialState: UserState = { count: 0 };

const reducerFunction = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useCount = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userState, updateUserState] = useReducer(
    reducerFunction,
    initialState
  );

  return (
    <AuthContext.Provider value={{ userState, updateUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
