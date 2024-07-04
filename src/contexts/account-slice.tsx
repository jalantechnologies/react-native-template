import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Account, ApiResponse, AsyncError } from '../types';
import { AccountService } from '../services';

const accountService = new AccountService();

export const getAccountDetails = createAsyncThunk(
  'account/getAccountDetails',
  async (): Promise<ApiResponse<Account>> => {
    const response = await accountService.getAccountDetails();
    return response;
  },
);

export const updateAccountDetails = createAsyncThunk(
  'account/updateAccountDetails',
  async ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse<Account>> => {
    try {
      const response = await accountService.updateAccountDetails(
        firstName,
        lastName,
      );
      return response;
    } catch (error) {
      throw (error).response.data;
    }
  },
);

type AccountState = {
  accountDetails: Account | undefined;
  accountError: AsyncError | null;
  isAccountLoading: boolean;
  isNewUser: boolean;
  isUpdateAccountLoading: boolean;
  updateAccountError: AsyncError | null;
};

const initialState: AccountState = {
  accountDetails: undefined,
  accountError: null,
  isAccountLoading: false,
  isNewUser: false,
  isUpdateAccountLoading: false,
  updateAccountError: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setIsNewUser: (state, action) => {
      state.isNewUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAccountDetails.pending, state => {
        state.isAccountLoading = true;
        state.accountError = null;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.isAccountLoading = false;
        state.accountDetails = action.payload.data;
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.isAccountLoading = false;
        state.accountError = action.error as AsyncError;
      })
      .addCase(updateAccountDetails.pending, state => {
        state.isUpdateAccountLoading = true;
        state.updateAccountError = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.isUpdateAccountLoading = false;
        state.accountDetails = action.payload.data;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.isUpdateAccountLoading = false;
        state.updateAccountError = action.error as AsyncError;
      });
  },
});

export const { setIsNewUser } = accountSlice.actions;

export default accountSlice.reducer;
