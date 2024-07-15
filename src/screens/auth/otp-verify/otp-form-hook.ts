import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants/auth';
import { AsyncError } from '../../../types';
import { sendOTP, verifyOTP } from '../../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface OTPFormProps {
  countryCode: string;
  onError: (error: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  phoneNumber: string;
}

const useOTPForm = ({
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  countryCode,
  phoneNumber,
}: OTPFormProps) => {
  const dispatch = useAppDispatch();
  const isVerifyOTPLoading = useAppSelector(state => state.auth.isVerifyOTPLoading);

  const formik = useFormik({
    initialValues: {
      otp: Array(constant.OTP_LENGTH).fill(''),
    },

    validationSchema: Yup.object({
      otp: Yup.array().of(Yup.string().required('')),
    }),

    onSubmit: values => {
      const otp = values.otp.join('');

      dispatch(
        verifyOTP({
          phoneNumber: {
            countryCode,
            phoneNumber,
          },
          otp,
        }),
      )
        .unwrap()
        .then(async () => {
          onVerifyOTPSuccess();
        })
        .catch(error => {
          onError(error as AsyncError);
        });
    },
  });

  const handleResendOTP = () => {
    dispatch(
      sendOTP({
        countryCode,
        phoneNumber,
      }),
    )
      .unwrap()
      .then(async () => {
        onResendOTPSuccess();
      })
      .catch(error => {
        onError(error as AsyncError);
      });
  };

  return {
    formik,
    handleResendOTP,
    isVerifyOTPLoading,
    sendOTP,
  };
};

export default useOTPForm;
