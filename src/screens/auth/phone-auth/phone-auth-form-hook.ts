import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';
import constant from '../../../constants/auth';
import { useNavigation } from '@react-navigation/native';

interface LoginFormProps {
  onError: (err: AsyncError) => void;
  onSendOTPSuccess: () => void;
}

const useLoginForm = ({ onSendOTPSuccess, onError }: LoginFormProps) => {
  const { isSendOTPLoading, sendOTP } = useAuthContext();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      countryCode: '+1',
      country: 'US',
      phoneNumber: '',
    },

    validationSchema: Yup.object({
      phoneNumber: Yup.string().required(constant.PHONE_VALIDATION_ERROR),
    }),

    onSubmit: values => {
      const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(
        values.phoneNumber,
        values.country,
      );
      const isValidPhoneNumber =
        PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);

      if (!isValidPhoneNumber) {
        onError({ message: constant.PHONE_VALIDATION_ERROR } as AsyncError);
        return;
      }

      const formattedPhoneNumber = parsedPhoneNumber
        ?.getNationalNumber()
        ?.toString();

      sendOTP({
        countryCode: values.countryCode,
        phoneNumber: formattedPhoneNumber as string,
      })
        .then(() => {
          onSendOTPSuccess();
          navigation.navigate('OTPVerify', {
            countryCode: formik.values.countryCode,
            phoneNumber: formik.values.phoneNumber,
          });
        })
        .catch((err: AsyncError) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    formik,
    isSendOTPLoading,
  };
};

export default useLoginForm;
