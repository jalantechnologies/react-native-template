import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import VerifiedIllustration from 'react-native-template/assets/img/account-verified.svg';

import { AuthenticatedStackScreenProps } from '../../../../@types/navigation';
import AuthLayout from '../auth-layout';

const AccountVerified: React.FC<AuthenticatedStackScreenProps<'AccountVerified'>> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  const handleDone = () => {
    navigation.navigate('Registration');
  };

  return (
    <AuthLayout primaryTitle="" secondaryTitle="">
      <View style={styles.container}>
        <View style={styles.illustrationWrapper}>
          <VerifiedIllustration height={220} width={220} />
        </View>

        <View style={styles.copyWrapper}>
          <Text style={[styles.title, { color: colors.onSurface }]} variant="titleLarge">
            Verified
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]} variant="bodyMedium">
            Your account has been verified successfully
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            onPress={handleDone}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            uppercase={false}
          >
            Done
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  copyWrapper: {
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  buttonWrapper: {
    marginTop: 48,
    width: '100%',
  },
  submitButton: {
    borderRadius: 24,
    marginTop: 'auto',
    width: '100%',
  },
  submitButtonContent: {
    height: 52,
  },
  subtitle: {
    lineHeight: 20,
    textAlign: 'center',
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
});

export default AccountVerified;

