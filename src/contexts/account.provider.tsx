import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { Account, ApiResponse, AsyncError } from '../types';

import useAsync from './async.hook';
import AccountService from '../services/account.service';

type AccountContextType = {
  accountDetails: Account;
  accountError: AsyncError;
  getAccountDetails: () => Promise<Account>;
  isAccountLoading: boolean;
  isNewUser: boolean;
  isUpdateAccountLoading: boolean;
  setIsNewUser: (isNewUser: boolean) => void;
  updateAccountDetails: (
    firstName: string,
    lastName: string,
  ) => Promise<Account>;
  updateAccountError: AsyncError;
};

const AccountContext = createContext<AccountContextType | null>(null);

const accountService = new AccountService();

export const useAccountContext = (): AccountContextType =>
  useContext(AccountContext) as AccountContextType;

const getAccountDetailsFn = async (): Promise<ApiResponse<Account>> =>
  accountService.getAccountDetails();

const updateAccountDetailsFn = async (
  firstName: string,
  lastName: string,
): Promise<ApiResponse<Account>> =>
  accountService.updateAccountDetails(firstName, lastName);

export const AccountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const {
    isLoading: isAccountLoading,
    error: accountError,
    result: accountDetails,
    asyncCallback: getAccountDetails,
  } = useAsync(getAccountDetailsFn);

  const {
    isLoading: isUpdateAccountLoading,
    error: updateAccountError,
    asyncCallback: updateAccountDetails,
  } = useAsync(updateAccountDetailsFn);

  return (
    <AccountContext.Provider
      value={{
        accountDetails: new Account({ ...accountDetails }),
        accountError,
        getAccountDetails,
        isAccountLoading,
        isNewUser,
        isUpdateAccountLoading,
        setIsNewUser,
        updateAccountDetails,
        updateAccountError,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
