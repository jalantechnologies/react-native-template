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
import { MD3Theme, Surface, Text, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
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

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    flex: { flex: 1 },
    contentContainer: { flexGrow: 1 },
    header: { flex: 1 },
    headerBg: { backgroundColor: theme.colors.primary },
    titleWrapper: {
      paddingTop: 32,
      paddingHorizontal: 32,
      alignSelf: 'flex-start',
    },
    titleText: { color: theme.colors.onPrimary },
    bodySurface: {
      flex: 1,
      width: '100%',
      marginTop: 32,
      paddingVertical: 32,
      paddingHorizontal: 32,
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
      backgroundColor: theme.colors.background,
    },
  });

export default AuthLayout;
