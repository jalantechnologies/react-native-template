import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAccountDetails, setIsNewUser } from '../../../redux/slices/account-slice';
import { AsyncError } from '../../../types';

interface RegistrationFormProps {
  onRegistrationError: (err: AsyncError) => void;
  onRegistrationSuccess: () => void;
}

const useRegistrationForm = ({
  onRegistrationError,
  onRegistrationSuccess,
}: RegistrationFormProps) => {
  const dispatch = useAppDispatch();
  const isUpdateAccountLoading = useAppSelector(state => state.account.isUpdateAccountLoading);

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
      dispatch(
        updateAccountDetails({
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(setIsNewUser(false));
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
