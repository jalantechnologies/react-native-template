import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAccountContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface RegistrationFormProps {
  onRegistrationError: (err: AsyncError) => void;
  onRegistrationSuccess: () => void;
}

const useRegistrationForm = ({
  onRegistrationError,
  onRegistrationSuccess,
}: RegistrationFormProps) => {
  const { updateAccountDetails, setIsNewUser, isUpdateAccountLoading } = useAccountContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters'),
    }),

    onSubmit: values => {
      updateAccountDetails(values.firstName, values.lastName)
        .then(() => {
          setIsNewUser(false);
          onRegistrationSuccess();
        })
        .catch((err: AsyncError) => {
          onRegistrationError(err as AsyncError);
        });
    },
  });

  return { formik, isUpdateAccountLoading };
};

export default useRegistrationForm;
