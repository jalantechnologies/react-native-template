import { useTheme,Text } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback, View, ScrollView, KeyboardAvoidingView, StyleSheet, StatusBar } from 'react-native';

import ChangeApiUrlButton from './change-api-url/change-api-url';

interface AuthLayoutProps {
  primaryTitle: string;
  secondaryTitle: string;
}

const useAuthLayoutStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: theme.colors.primary,
      paddingTop:
        Platform.OS === 'android'
          ? (StatusBar.currentHeight || 24) + 16
          : 44,
      paddingBottom: 16,
      paddingHorizontal: '5%',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleContainer: {
      flex: 1,
      paddingHorizontal: '5%',
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.surfaceVariant,
    },
    cardContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    cardContent: {
      flex: 1,
      paddingTop: 24,
      paddingBottom: 32,
      paddingHorizontal: '10%',
    },
  });
};


const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  primaryTitle,
  secondaryTitle,
  children,
}) => {
  const styles = useAuthLayoutStyles();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title} >{primaryTitle}</Text>
                  <Text style={styles.title}>{secondaryTitle}</Text>
                </View>
                <ChangeApiUrlButton />
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardContent}>
                {children}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AuthLayout;
