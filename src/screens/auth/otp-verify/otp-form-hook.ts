import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants/auth';
import { AsyncError } from '../../../types';
import { useAuthContext } from '../../../contexts';

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
  const { isVerifyOTPLoading, sendOTP, verifyOTP } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      otp: Array(constant.OTP_LENGTH).fill(''),
    },

    validationSchema: Yup.object({
      otp: Yup.array().of(Yup.string().required('')),
    }),

    onSubmit: values => {
      const otp = values.otp.join('');

      verifyOTP({
        phoneNumber: {
          countryCode,
          phoneNumber,
        },
        otp,
      })
        .then(() => {
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
