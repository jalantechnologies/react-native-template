import React, { useMemo } from 'react';
import { PropsWithChildren, createContext } from 'react';
import { Account } from '../models';
import { AccountService } from '../services';

export interface AccountContextInterface {
  getCatFacts: () => Promise<any>;
}

export const AccountContext = createContext<AccountContextInterface>(undefined);

export const AccountContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const accountService = useMemo(() => new AccountService(), []);

  const getCatFacts = async () => {
    const data = await accountService.getFacts();
    return data.data;
  };

  return (
    <AccountContext.Provider value={{ getCatFacts }}>
      {children}
    </AccountContext.Provider>
  );
};
