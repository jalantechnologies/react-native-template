import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { AsyncError } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../contexts';

interface LoginFormProps {
  onError: (err: AsyncError) => void;
  onSendOTPSuccess: () => void;
}

const useLoginForm = ({ onSendOTPSuccess, onError }: LoginFormProps) => {
  const { isSendOTPLoading, sendOTP } = useAuthContext();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      countryCode: '+1',
      country: 'US',
      phoneNumber: '',
    },

    validationSchema: Yup.object({
      phoneNumber: Yup.string().required(t('auth:phoneNumberRequired')),
    }),

    onSubmit: values => {
      const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(
        values.phoneNumber,
        values.country,
      );
      const isValidPhoneNumber = PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);

      if (!isValidPhoneNumber) {
        onError({
          message: t('error:phoneValidation') as string,
        } as AsyncError);
        return;
      }

      const formattedPhoneNumber = parsedPhoneNumber?.getNationalNumber()?.toString();

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
