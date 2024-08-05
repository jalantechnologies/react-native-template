import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { MainScreenProps } from '../../../../@types/navigation';
import { useAuthContext } from '../../../contexts';
import { AsyncError, PhoneNumber } from '../../../types';

interface PhoneAuthFormProps {
  onError: (err: AsyncError) => void;
  onSendOTPSuccess: () => void;
}

const usePhoneAuthForm = ({ onSendOTPSuccess, onError }: PhoneAuthFormProps) => {
  const { isSendOTPLoading, sendOTP } = useAuthContext();

  const navigation = useNavigation<MainScreenProps<'PhoneAuth'>['navigation']>();
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

      sendOTP(
        new PhoneNumber({
          countryCode: values.countryCode,
          phoneNumber: formattedPhoneNumber,
        }),
      )
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

export default usePhoneAuthForm;
