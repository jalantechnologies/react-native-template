import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AsyncError, PhoneNumber } from '../../../types';
import { useAuthContext } from '../../../contexts';
import { AuthOptions } from '../../../constants';

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
      otp: Array(AuthOptions.OTPLength).fill(''),
    },

    validationSchema: Yup.object({
      otp: Yup.array().of(Yup.string().required('')),
    }),

    onSubmit: values => {
      const otp = values.otp.join('');

      verifyOTP(otp, new PhoneNumber({ countryCode, phoneNumber }))
        .then(() => {
          onVerifyOTPSuccess();
        })
        .catch(error => {
          onError(error as AsyncError);
        });
    },
  });

  const handleResendOTP = () => {
    sendOTP(new PhoneNumber({ countryCode, phoneNumber }))
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
