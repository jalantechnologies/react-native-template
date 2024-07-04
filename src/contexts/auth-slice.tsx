import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AccessToken, AsyncError, PhoneNumber } from '../types';
import { AuthService } from '../services';
import { clearAccessToken, getAccessToken, setAccessToken } from '../utils';

const authService = new AuthService();

export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (phoneNumber: PhoneNumber): Promise<void> => {
    await authService.sendOTP(phoneNumber);
  },
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({
    phoneNumber,
    otp,
  }: {
    phoneNumber: PhoneNumber;
    otp: string;
  }): Promise<AccessToken | undefined> => {
    try {
      const response = await authService.verifyOTP(phoneNumber, otp);
      if (response.data) {
        setAccessToken(response.data);
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

type AuthState = {
  isSendOTPLoading: boolean;
  isUserAuthenticated: boolean;
  isVerifyOTPLoading: boolean;
  sendOTPError: AsyncError | null;
  verifyOTPError: AsyncError | null;
  verifyOTPResult: AccessToken | undefined;
};

const initialState: AuthState = {
  isSendOTPLoading: false,
  isUserAuthenticated: !!getAccessToken(),
  isVerifyOTPLoading: false,
  sendOTPError: null,
  verifyOTPError: null,
  verifyOTPResult: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      clearAccessToken();
      state.isUserAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOTP.pending, state => {
        state.isSendOTPLoading = true;
        state.sendOTPError = null;
      })
      .addCase(sendOTP.fulfilled, state => {
        state.isSendOTPLoading = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isSendOTPLoading = false;
        state.sendOTPError = action.error as AsyncError;
      })
      .addCase(verifyOTP.pending, state => {
        state.isVerifyOTPLoading = true;
        state.verifyOTPError = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isVerifyOTPLoading = false;
        state.verifyOTPResult = action.payload;
        state.isUserAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isVerifyOTPLoading = false;
        state.verifyOTPError = action.error as AsyncError;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
