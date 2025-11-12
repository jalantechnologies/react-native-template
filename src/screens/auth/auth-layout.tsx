/* eslint-disable react/require-default-props */
import React, { PropsWithChildren } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import LeadingIcon from '../../../assets/img/leading-icon.svg';

interface AuthLayoutProps {
  onBackPress?: () => void;
  primaryTitle: string;
  secondaryTitle: string;
}

const AuthLayoutContent: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  children,
  onBackPress,
  primaryTitle,
  secondaryTitle,
}) => {
  const { colors } = useTheme();

  const hasTitle = Boolean(primaryTitle || secondaryTitle);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={[styles.contentContainer, { backgroundColor: colors.background }]}
        >
          <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
              {onBackPress ? (
                <IconButton icon={LeadingIcon} onPress={onBackPress} size={24} style={styles.backButton} />
              ) : null}
              {hasTitle ? (
                <View style={styles.headerTitles}>
                  {primaryTitle ? (
                    <Text style={[styles.heading, { color: colors.onSurface }]} variant="headlineLarge">
                      {primaryTitle}
                    </Text>
                  ) : null}
                  {secondaryTitle ? (
                    <Text style={[styles.heading, { color: colors.onSurface }]} variant="headlineLarge">
                      {secondaryTitle}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
            <View style={[styles.content, { backgroundColor: colors.background }]}>
              {children}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  onBackPress = undefined,
  ...rest
}) => <AuthLayoutContent onBackPress={onBackPress} {...rest} />;

AuthLayout.defaultProps = {
  onBackPress: undefined,
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentContainer: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerTitles: {
    flexShrink: 1,
  },
  heading: {
    fontWeight: '700',
    textAlign: 'left',
  },
  wrapper: {
    flex: 1,
    minHeight: '100%',
    position: 'relative',
  },
});

export default AuthLayout;
