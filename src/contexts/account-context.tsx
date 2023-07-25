import React, { PropsWithChildren, createContext, useMemo } from 'react';
import { AccountService } from '../services';

export interface AccountContextInterface {
  getCatFacts: () => Promise<any>;
}

export const AccountContext = createContext<AccountContextInterface>(undefined);

export const AccountContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const accountService = useMemo(() => new AccountService(), []);

  const getCatFacts = async () => {
    const { data } = await accountService.getCatFacts();
    return data;
  };

  return (
    <AccountContext.Provider value={{ getCatFacts }}>
      {children}
    </AccountContext.Provider>
  );
};
