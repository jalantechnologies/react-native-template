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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView bounces={false} contentContainerStyle={styles.contentContainer}>
          <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
            <View style={styles.titleWrapper}>
              <Text variant="displaySmall" style={{ color: theme.colors.onPrimary }}>
                {primaryTitle}
              </Text>
              <Text variant="displaySmall" style={{ color: theme.colors.onPrimary }}>
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

const useStyles = (theme: any) =>
  StyleSheet.create({
    flex: { flex: 1 },
    contentContainer: { flexGrow: 1 },
    header: { flex: 1 },
    titleWrapper: {
      paddingTop: '10%',
      paddingHorizontal: '10%',
      alignSelf: 'flex-start',
    },
    bodySurface: {
      flex: 1,
      width: '100%',
      marginTop: 32,
      paddingVertical: 32,
      paddingHorizontal: '10%',
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
    },
  });

export default AuthLayout;
