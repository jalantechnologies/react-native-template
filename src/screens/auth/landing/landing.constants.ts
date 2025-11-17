export const LANDING_COLORS = {
  backgroundGradient: ['#2205E9', '#3916ED', '#5028F0'],
  badgeGradient: ['#FBBF24', '#F97316'],
  cardBackground: 'rgba(255,255,255,0.15)',
  cardBorder: 'rgba(255,255,255,0.2)',
  cardSubText: 'rgba(255,255,255,0.8)',
  cardText: '#FFFFFF',
  disclaimer: 'rgba(255,255,255,0.7)',
  heroIconBorder: '#2205E9',
  subtitle: 'rgba(255,255,255,0.9)',
  text: '#FFFFFF',
};

export const LANDING_EFFECTS = {
  cardBlurAmount: 10,
  cardBlurFallbackColor: 'rgba(255,255,255,0.15)',
} as const;

export const LANDING_ICON_SIZES = {
  badge: 24,
  card: 24,
  hero: 80,
} as const;

export const LANDING_SPACING = {
  layoutPadding: 24,
  heroPaddingTop: 48,
  heroIconMarginBottom: 32,
  cardGap: 12,
  cardPadding: 16,
  cardInnerGap: 16,
  ctaGap: 12,
  ctaPaddingBottom: 16,
  titleMarginBottom: 12,
  subtitleMarginBottom: 48,
  contentMaxWidth: 448,
  badgeSize: 48,
  heroIconSize: 128,
  heroInnerSize: 96,
  cardBorderRadius: 16,
  cardIconSize: 48,
  sectionGap: 32,
  screenPaddingBottom: 32,
  screenPaddingHorizontal: 24,
  screenPaddingTop: 56,
};

export const LANDING_TYPOGRAPHY = {
  cardDescriptionSize: 14,
  cardTitleSize: 18,
  ctaSize: 18,
  disclaimerSize: 14,
  subtitleSize: 18,
  titleSize: 36,
};

export const FEATURE_CARDS = [
  { icon: 'target', gradient: ['#FE5F99', '#FF4F6D'] },
  { icon: 'flash', gradient: ['#FFB347', '#FF8C1A'] },
  { icon: 'shield', gradient: ['#2FD6A5', '#1BB6B0'] },
] as const;

