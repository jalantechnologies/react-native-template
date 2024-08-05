import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AccountService } from '../services';
import { AccessToken, Account, Nullable } from '../types';

import { useAuthContext } from './auth-context';

interface AccountContextInterface {
  accountDetails: Nullable<Account>;
  deleteAccount: () => Promise<void>;
  getAccountDetails: () => Promise<void>;
  isAccountLoading: boolean;
  isDeleteAccountLoading: boolean;
  isNewUser: boolean;
  isUpdateAccountLoading: boolean;
  setIsNewUser: (isNewUser: boolean) => void;
  updateAccountDetails: (firstName: string, lastName: string) => Promise<void>;
}

export const AccountContext = createContext<AccountContextInterface | undefined>(undefined);

export const useAccountContext = (): AccountContextInterface =>
  useContext(AccountContext as Context<AccountContextInterface>);

export const AccountContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const accountService = useMemo(() => new AccountService(), []);

  const [accountDetails, setAccountDetails] = useState<Nullable<Account>>(null);
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isUpdateAccountLoading, setIsUpdateAccountLoading] = useState(false);
  const [isDeleteAccountLoading, setIsDeleteAccountLoading] = useState(false);

  const { getAccessTokenFromStorage } = useAuthContext();

  const getAccountDetails = async () => {
    setIsAccountLoading(true);
    const { data, error } = await accountService.getAccount(
      getAccessTokenFromStorage() as AccessToken,
    );
    if (data) {
      setAccountDetails(new Account({ ...data }));
      if (!data.firstName) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
      }
      setIsAccountLoading(false);
    } else {
      setIsAccountLoading(false);
      throw error;
    }
  };

  const updateAccountDetails = async (firstName: string, lastName: string) => {
    setIsUpdateAccountLoading(true);
    const { data, error } = await accountService.updateAccount(
      firstName,
      lastName,
      getAccessTokenFromStorage() as AccessToken,
    );
    if (data) {
      setAccountDetails(new Account({ ...data }));
      setIsUpdateAccountLoading(false);
    } else {
      setIsUpdateAccountLoading(false);
      throw error;
    }
  };

  const deleteAccount = async () => {
    setIsDeleteAccountLoading(true);
    const { error } = await accountService.deleteAccount(
      getAccessTokenFromStorage() as AccessToken,
    );
    if (error) {
      setIsDeleteAccountLoading(false);
      throw error;
    }
    setIsDeleteAccountLoading(false);
  };

  return (
    <AccountContext.Provider
      value={{
        accountDetails,
        deleteAccount,
        getAccountDetails,
        isAccountLoading,
        isDeleteAccountLoading,
        isNewUser,
        isUpdateAccountLoading,
        setIsNewUser,
        updateAccountDetails,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
