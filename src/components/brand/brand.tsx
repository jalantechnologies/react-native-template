import BrandLogo from 'boilerplate-react-native/assets/img/logo.svg';
import { SpinnerSize, SpinnerTypes } from 'boilerplate-react-native/src/types/spinner';
import { useTheme, Box } from 'native-base';
import React, { useRef, useEffect, useMemo } from 'react';
import { Animated, Dimensions, Text, StyleSheet } from 'react-native';

import Spinner from '../spinner/spinner';

type Props = {
  height?: number | string;
  width?: number | string;
};

const Brand: React.FC<Props> = ({ height, width }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const LOGO_SIZE = 150;
  const ANIM_DURATION_IN_MS = 500;
  const FADE_DURATION_IN_MS = 300;
  const PAUSE_DURATION_IN_MS = 1000;

  const translateY = useRef(new Animated.Value(-LOGO_SIZE)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    /**
     * Animates the company logo and brand text in a simple intro sequence:
     * 1. The logo slides down from above the viewport to the vertical center over ANIM_DURATION_IN_MS = 500 ms.
     * 2. A PAUSE_DURATION_IN_MS = 1000 ms pause occurs with the logo fully visible.
     * 3. The logo fades out while the brand text ("Better.") fades in over FADE_DURATION_IN_MS = 300 ms.
     */
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT / 2 - LOGO_SIZE / 2,
        duration: ANIM_DURATION_IN_MS,
        useNativeDriver: true,
      }),
      Animated.delay(PAUSE_DURATION_IN_MS),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [translateY, logoOpacity, textOpacity]);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        logoAnim: {
          transform: [{ translateY }],
          opacity: logoOpacity,
        },
        textColor: {
          color: colors.secondary['50'],
        },
      }),
    [translateY, logoOpacity, colors.secondary['50']],
  );

  return (
    <Box
      testID="brand-img-wrapper"
      backgroundColor={colors.primary['500']}
      height={height ?? '100%'}
      width={width ?? '100%'}
      position="relative"
    >
      <Animated.View style={[styles.logoContainer, dynamicStyles.logoAnim]}>
        <BrandLogo width={LOGO_SIZE} height={LOGO_SIZE} />
      </Animated.View>

      <Animated.View style={[styles.centerContainer, { opacity: textOpacity }]}>
        <Text style={[styles.centerText, dynamicStyles.textColor]}>Better.</Text>
      </Animated.View>

      <Animated.View style={styles.spinnerWrapper}>
        <Spinner size={SpinnerSize.LARGE} type={SpinnerTypes.SECONDARY} />
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 48,
    textAlign: 'center',
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
});

Brand.defaultProps = {
  height: undefined,
  width: undefined,
};

export default Brand;
