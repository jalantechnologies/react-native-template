import { useTheme } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, StatusBar } from 'react-native';

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
      backgroundColor: theme.colors.primary['500'],
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: theme.colors.primary['500'],
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + Number(theme.space['4']) : Number(theme.space['10']) + Number(theme.space['4']),
      paddingBottom: Number(theme.space['4']),
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
      fontSize: Number(theme.fontSizes['4xl']),
      fontWeight: 'bold',
      color: theme.colors.secondary['50'],
    },
    cardContainer: {
      flex: 1,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: Number(theme.radii['2xl']),
      borderTopRightRadius: Number(theme.radii['2xl']),
    },
    cardContent: {
      flex: 1,
      paddingTop: Number(theme.space['6']),
      paddingBottom: Number(theme.space['8']),
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
                  <Text style={styles.title}>{primaryTitle}</Text>
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
