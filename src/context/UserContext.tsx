import React, { useContext, useState } from 'react';

export interface IUserContext {
  id: number;
  name: string;
  surname: string;
  address: string;
  number: string;
  email: string;
}

const INITIAL_VALUE: IUserContext = {
  id: 0,
  name: '',
  surname: '',
  address: '',
  number: '',
  email: '',
};

const UserContext = React.createContext<[IUserContext, any]>([
  INITIAL_VALUE,
  () => {},
]);

const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<IUserContext>(INITIAL_VALUE);

  const { children } = props;

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUserContext = () => useContext(UserContext);

export { UserContext, UserContextProvider };
