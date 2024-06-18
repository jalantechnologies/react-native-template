import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAccountContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface RegistrationFormProps {
  onError: (errors: AsyncError) => void;
  onRegistrationSuccess: () => void;
}

const useRegistrationForm = ({
  onError,
  onRegistrationSuccess,
}: RegistrationFormProps) => {
  const { isUpdateAccountLoading, updateAccountDetails, setIsNewUser } =
    useAccountContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First Name is required')
        .min(3, 'First Name must be at least 3 characters'),
      lastName: Yup.string()
        .required('Last Name is required')
        .min(3, 'Last Name must be at least 3 characters'),
    }),

    validateOnMount: true,

    onSubmit: values => {
      updateAccountDetails(values.firstName, values.lastName)
        .then(async () => {
          setIsNewUser(false);
          onRegistrationSuccess();
        })
        .catch((err: AsyncError) => {
          onError(err);
        });
    },
  });

  return {
    formik,
    isUpdateAccountLoading,
  };
};

export default useRegistrationForm;
