import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  HelperText,
  TextInput,
  useTheme,
  Text,
  Button,
  Snackbar,
} from 'react-native-paper';
import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';
import  {useStyles}  from './styles';
import useProfileUpdateForm from './profile-update-form.hook';

const EditProfile: React.FC<
  ProfileStackScreenProps<'EditProfile'>
> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles()
  const [snackbar, setSnackbar] = React.useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: '' });

  const onProfileUpdateSuccess = () => {
    setSnackbar({
      visible: true,
      message: 'Profile updated successfully',
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const onProfileUpdateError = (err: AsyncError) => {
    setSnackbar({
      visible: true,
      message: err.message,
    });
  };

  const { formik, isUpdateAccountLoading } = useProfileUpdateForm({
    onProfileUpdateError,
    onProfileUpdateSuccess,
  });

  return (
    <ProfileLayout>
      <KeyboardAvoidingView
        style={{ flex: 1,justifyContent:'space-between'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.layout}>
          <View>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              mode="outlined"
              placeholder="First Name"
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              style={{ backgroundColor: colors.surface }}
              error={!!formik.errors.firstName}
            />
            <HelperText type="error" visible={!!formik.errors.firstName}>
              {formik.errors.firstName}
            </HelperText>
          </View>

          <View>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              mode="outlined"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              style={{ backgroundColor: colors.surface }}
              error={!!formik.errors.lastName}
            />
            <HelperText type="error" visible={!!formik.errors.lastName}>
              {formik.errors.lastName}
            </HelperText>
          </View>

          <View>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              mode="outlined"
              value={formik.values.phoneNumber}
              editable={false}
              disabled
              style={{ backgroundColor: colors.surfaceVariant }}
            />
            <HelperText
              type="error"
              visible={!!formik.errors.phoneNumber}
            >
              {formik.errors.phoneNumber}
            </HelperText>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => formik.handleSubmit()}
          loading={isUpdateAccountLoading}
          style={styles.Button}
        >
          Save Changes
        </Button>

        <Snackbar
          visible={snackbar.visible}
          onDismiss={() =>
            setSnackbar({ visible: false, message: '' })
          }
        >
          {snackbar.message}
        </Snackbar>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

export default EditProfile;
