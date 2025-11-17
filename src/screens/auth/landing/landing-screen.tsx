import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MainScreenProps } from '../../../../@types/navigation';

import { LANDING_ICONS } from './landing-icons';
import { FEATURE_CARDS, LANDING_COLORS, LANDING_EFFECTS } from './landing.constants';
import styles from './landing.styles';

const LandingScreen = () => {
  const navigation = useNavigation<MainScreenProps<'Landing'>['navigation']>();

  const handleGetStarted = () => {
    navigation.navigate('PhoneAuth');
  };

  const HeroIcon = LANDING_ICONS.hero;
  const BadgeIcon = LANDING_ICONS.badge;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[...LANDING_COLORS.backgroundGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
          <View style={styles.heroSection}>
            <View style={styles.heroIconWrapper}>
              <Surface style={styles.heroIcon}>
                  <HeroIcon style={styles.heroIconSvg} />
              </Surface>
              <LinearGradient colors={[...LANDING_COLORS.badgeGradient]} style={styles.badge}>
                <BadgeIcon style={styles.badgeIcon} />
              </LinearGradient>
            </View>
              <Text style={styles.title}>Task Master</Text>
              <Text style={styles.subtitle}>
                Your personal productivity companion. Organize tasks, achieve goals, stay focused.
              </Text>
          </View>

          <View style={styles.cardList}>
            {FEATURE_CARDS.map((card, index) => {
              const CardIcon = LANDING_ICONS[card.icon];

              return (
                <Card key={`${card.icon}-${index}`} style={[styles.card, index > 0 && styles.cardSpacing]}>
                  <BlurView
                    style={styles.cardBlur}
                    blurType="light"
                    blurAmount={LANDING_EFFECTS.cardBlurAmount}
                    reducedTransparencyFallbackColor={LANDING_EFFECTS.cardBlurFallbackColor}
                  />
                  <Card.Content style={styles.cardContent}>
                    <LinearGradient colors={[...card.gradient]} style={styles.cardIcon}>
                      <CardIcon style={styles.cardIconSvg} />
                    </LinearGradient>
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardTitle}>
                        {index === 0 ? 'Goal Focused' : index === 1 ? 'Lightning Fast' : 'Secure & Private'}
                      </Text>
                      <Text style={styles.cardDescription}>
                        {index === 0
                          ? 'Align your daily tasks with your bigger goals'
                          : index === 1
                          ? 'Create and manage tasks in seconds'
                          : 'Your data is encrypted and safe'}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </View>

          <View style={styles.ctaWrapper}>
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={styles.ctaButton}
              contentStyle={styles.ctaButtonContent}
              labelStyle={styles.ctaButtonLabel}
            >
                Get Started Free
            </Button>
              <Text style={styles.disclaimer}>No credit card required • Free forever</Text>
          </View>
        </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LandingScreen;
