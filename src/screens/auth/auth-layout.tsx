import React, { PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import type { AppTheme } from '../../theme/app-theme';

import ChangeApiUrlButton from './change-api-url/change-api-url';
interface AuthLayoutProps {
  primaryTitle: string;
  secondaryTitle: string;
}

const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  primaryTitle,
  secondaryTitle,
  children,
}) => {
  const theme = useTheme<AppTheme>();
  const styles = useStyles(theme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex} >
        <ScrollView bounces={false} contentContainerStyle={styles.contentContainer}>
          <View style={[styles.header, styles.headerBg]}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText} variant="displaySmall">
                {primaryTitle}
              </Text>
              <Text style={styles.titleText} variant="displaySmall">
                {secondaryTitle}
              </Text>
            </View>
            <ChangeApiUrlButton />
            <Surface style={styles.bodySurface}>{children}</Surface>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    flex: { flex: 1 },
    contentContainer: { flexGrow: 1 },
    header: { flex: 1 },
    headerBg: { backgroundColor: theme.colors.primary },
    titleWrapper: {
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
    },
    titleText: {
      color: theme.colors.onPrimary,
      fontWeight: '700',
    },
    bodySurface: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
      flex: 1,
      marginTop: theme.spacing.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.xl,
      width: '100%',
    },
  });

export default AuthLayout;
