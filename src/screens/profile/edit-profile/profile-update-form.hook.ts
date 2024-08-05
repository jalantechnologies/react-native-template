import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAccountContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface ProfileUpdateFormProps {
  onProfileUpdateError: (err: AsyncError) => void;
  onProfileUpdateSuccess: () => void;
}

const useProfileUpdateForm = ({
  onProfileUpdateError,
  onProfileUpdateSuccess,
}: ProfileUpdateFormProps) => {
  const { accountDetails, updateAccountDetails, isUpdateAccountLoading } = useAccountContext();

  const formik = useFormik({
    initialValues: {
      firstName: accountDetails?.firstName,
      lastName: accountDetails?.lastName,
      phoneNumber: accountDetails?.phoneNumber.getFormattedPhoneNumber(),
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters'),
    }),

    onSubmit: values => {
      updateAccountDetails(values.firstName as string, values.lastName as string)
        .then(() => {
          onProfileUpdateSuccess();
        })
        .catch((err: AsyncError) => {
          onProfileUpdateError(err as AsyncError);
        });
    },
  });

  return { formik, isUpdateAccountLoading };
};

export default useProfileUpdateForm;
