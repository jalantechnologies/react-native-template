import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants/auth';
import { useAccountContext, useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface OTPFormProps {
  onError: (error: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  countryCode: string;
  phoneNumber: string;
}

const useOTPForm = ({
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  countryCode,
  phoneNumber,
}: OTPFormProps) => {
  const { isVerifyOTPLoading, sendOTP, verifyOTP } = useAuthContext();
  const { getAccountDetails, setIsNewUser } = useAccountContext();

  const formik = useFormik({
    initialValues: {
      otp: Array(constant.OTP_LENGTH).fill(''),
    },

    validationSchema: Yup.object({
      otp: Yup.array().of(Yup.string().required('')),
    }),

    validateOnMount: true,

    onSubmit: values => {
      const otp = values.otp.join('');

      verifyOTP({ countryCode, phoneNumber }, otp)
        .then(async () => {
          const account = await getAccountDetails();
          if (account.firstName && account.lastName) {
            setIsNewUser(false);
          } else {
            setIsNewUser(true);
          }
          onVerifyOTPSuccess();
        })
        .catch(error => {
          onError(error as AsyncError);
        });
    },
  });

  const handleResendOTP = () => {
    sendOTP({
      countryCode,
      phoneNumber,
    })
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
