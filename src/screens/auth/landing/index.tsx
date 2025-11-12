import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import LandingIllustration from 'react-native-template/assets/img/landing-illustration.svg';
import LandingWordmark from 'react-native-template/assets/img/landing-wordmark.svg';

import { MainScreenProps } from '../../../../@types/navigation';
import AuthLayout from '../auth-layout';

const AuthLanding: React.FC<MainScreenProps<'AuthLanding'>> = ({ navigation }) => {
  const { colors } = useTheme();

  const handleGetStarted = () => {
    navigation.navigate('PhoneAuth');
  };

  return (
    <AuthLayout primaryTitle="" secondaryTitle="">
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <LandingWordmark height={48} width={48} />
          <Text style={[styles.brandText, { color: colors.primary }]} variant="titleLarge">
            Better
          </Text>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.primaryContainer }]}>
          <LandingIllustration width="100%" height="100%" />
        </View>

        <View style={styles.copyWrapper}>
          <Text style={[styles.title, { color: colors.onSurface }]} variant="titleLarge">
            Software For Businesses
          </Text>
          <Text style={[styles.description, { color: colors.onSurfaceVariant }]} variant="bodyMedium">
            Streamline operations with our innovative software solutions. Maximize efficiency.
          </Text>
        </View>

        <View style={styles.pagination}>
          <View
            style={[
              styles.paginationDot,
              styles.paginationDotActive,
              { backgroundColor: colors.primary },
            ]}
          />
          <View
            style={[
              styles.paginationDot,
              styles.paginationDotInactive,
              { backgroundColor: colors.primary },
            ]}
          />
          <View
            style={[
              styles.paginationDot,
              styles.paginationDotInactive,
              { backgroundColor: colors.primary },
            ]}
          />
          <View
            style={[
              styles.paginationDot,
              styles.paginationDotInactive,
              { backgroundColor: colors.primary },
            ]}
          />
        </View>

        <Button
          buttonColor={colors.primary}
          mode="contained"
          onPress={handleGetStarted}
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          uppercase={false}
        >
          Get Started
        </Button>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 24,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  brandText: {
    fontWeight: '600',
  },
  heroCard: {
    alignItems: 'center',
    borderRadius: 32,
    height: 220,
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
  },
  copyWrapper: {
    marginTop: 32,
    width: '100%',
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
  description: {
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  paginationDot: {
    borderRadius: 6,
    height: 6,
    width: 10,
  },
  paginationDotActive: {
    width: 24,
  },
  paginationDotInactive: {
    opacity: 0.2,
  },
  ctaButton: {
    borderRadius: 24,
    marginTop: 'auto',
    width: '100%',
  },
  ctaButtonContent: {
    height: 52,
  },
});

export default AuthLanding;

