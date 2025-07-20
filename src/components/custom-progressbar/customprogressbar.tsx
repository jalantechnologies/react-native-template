import { Box, HStack, Progress, ScrollView, Text, useTheme, VStack } from 'native-base';
import React from 'react';

type BaseProps = {
  title?: string;
  colorScheme?: keyof ReturnType<typeof useTheme>['colors'];
  trackColor?: string;
  label?: string;
  mode?: 'light' | 'dark';
  width?: number | string;
};

type StepProps = BaseProps & {
  variant: 'step';
  completedSteps?: number[];
  failedSteps?: number[];
  totalSteps: number;
};

type CardProps = BaseProps & {
  variant: 'card';
  value: number;
  status?: 'up' | 'down';
  statusText?: string;
  subtitle?: string;
};

type StorageProps = BaseProps & {
  variant: 'storage';
  value: number;
  current?: string;
  total?: string;
  label?: string;
};

type DefaultOrOtherVariantsProps = BaseProps & {
  variant?: 'default' | 'level' | 'bar' | 'text';
  value?: number;
  totalSteps?: number;
  completedSteps?: number;
};

type LinearProgressProps = StepProps | DefaultOrOtherVariantsProps | CardProps | StorageProps;

const isStepProps = (props: LinearProgressProps): props is StepProps => props.variant === 'step';
const isLevelVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'level';
const isBarVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'bar' || (!props.variant && 'value' in props && 'totalSteps' in props);
const isTextVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'text';
const isCardProps = (props: LinearProgressProps): props is CardProps => props.variant === 'card';
const isStorageProps = (props: LinearProgressProps): props is StorageProps =>
  props.variant === 'storage';

function resolveThemeColor(
  theme: ReturnType<typeof useTheme>,
  group: string,
  shade: string,
  fallback: string,
) {
  const colorGroup = theme.colors[group as keyof typeof theme.colors] as any;
  if (typeof colorGroup === 'object' && colorGroup !== null && shade in colorGroup) {
    return colorGroup[shade];
  }
  if (typeof colorGroup === 'string') {
    return colorGroup;
  }
  return fallback;
}

function lookupTrackColor(theme: ReturnType<typeof useTheme>, provided?: string) {
  if (!provided) return theme.colors.secondary?.['100'];
  const match = /^([a-zA-Z]+)\.?(\d+)?$/.exec(provided);
  if (match) {
    const group = match[1];
    const shade = match[2] || '100';
    return resolveThemeColor(theme, group, shade, theme.colors.secondary?.['100']);
  }
  return provided;
}

type WrapperProps = {
  children: React.ReactNode;
  title?: string;
  bgCard?: string;
  primaryText?: string;
};

const Wrapper = ({
  children,
  title = '',
  bgCard = 'secondary.50',
  primaryText = 'secondary.900',
}: WrapperProps) => (
  <Box bg={bgCard} rounded="lg" px={4} py={3} mx={2}>
    {title ? (
      <Text color={primaryText} fontWeight="bold" fontSize="md" mb={2}>
        {title}
      </Text>
    ) : null}
    {children}
  </Box>
);

const CustomProgressBar = ({
  colorScheme = 'primary',
  trackColor,
  mode = 'light',
  width: widthProp = '310px',
  title = '',
  ...props
}: LinearProgressProps) => {
  const theme = useTheme();
  const isDark = mode === 'dark';
  const palette = theme.colors;

  const primaryText = isDark ? palette.secondary?.['100'] : palette.secondary?.['900'];
  const secondaryText = isDark ? palette.secondary?.['400'] : palette.secondary?.['600'];
  const bgCard = isDark ? palette.secondary?.['900'] : palette.secondary?.['50'];
  const borderPass = palette.success?.['600'];
  const textFail = palette.danger?.['500'];
  const textPass = palette.success?.['500'];
  const trackDefault = lookupTrackColor(theme, trackColor);

  if (isStorageProps(props)) {
    const { value, label: storageLabel = 'Upload Progress', current, total } = props;
    const outerBg = isDark ? palette.secondary?.['900'] : palette.secondary?.['50'];
    const mainText = isDark ? palette.secondary?.['100'] : palette.secondary?.['900'];
    const percentText = isDark ? palette.secondary?.['100'] : palette.secondary?.['900'];
    const subText = isDark ? palette.secondary?.['400'] : palette.secondary?.['700'];
    const progressTrack = isDark ? palette.secondary?.['800'] : palette.secondary?.['100'];
    const filled = palette.success?.['600'];

    return (
      <Box bg={outerBg} borderRadius="lg" px={4} py={3} w={widthProp}>
        <VStack space={2} w="100%">
          <HStack justifyContent="space-between" alignItems="center" mb={current && total ? 0 : 1}>
            <Text fontWeight="bold" color={mainText} fontSize="md">
              {storageLabel}
            </Text>
            {/* This ensures getByText('60% complete') works */}
            <Text fontWeight="bold" fontSize="md" color={percentText}>
              {`${Math.round(value)}% complete`}
            </Text>
          </HStack>
          <Progress
            value={value}
            h="2"
            borderRadius="full"
            bg={progressTrack}
            _filledTrack={{ bg: filled }}
          />
          {/* Make sure getByText('600 MB of 1 GB') can find the whole string */}
          {current && total && (
            <Text mt={1} fontSize="sm" color={subText}>
              {`${current} of ${total}`}
            </Text>
          )}
        </VStack>
      </Box>
    );
  }

  if (isCardProps(props)) {
    const { value, status = 'up', statusText, subtitle } = props;
    const success = palette.success?.['500'];
    const danger = palette.danger?.['500'];
    const cardBg = isDark ? palette.secondary?.['900'] : palette.secondary?.['50'];
    const percentColor = status === 'up' ? success : danger;
    const percentBg = `${percentColor}22`;
    const subtitleColor = isDark ? palette.secondary?.['400'] : palette.secondary?.['500'];
    const primary500 = resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500']);
    const progressTrack = palette.secondary?.['100'];

    const Arrow = (
      <Text ml={1} color={percentColor} fontSize="16px">
        {status === 'up' ? '↑' : '↓'}
      </Text>
    );

    return (
      <Box bg={cardBg} borderRadius="lg" px={4} py={3} mx={2} w={widthProp}>
        <HStack justifyContent="space-between" alignItems="center" mb={1}>
          <Text
            fontWeight="bold"
            fontSize="18px"
            color={isDark ? palette.secondary?.['100'] : palette.secondary?.['900']}
          >
            {title || 'Progress'}
          </Text>
          <HStack alignItems="center" px={2} py={0.5} borderRadius="md" bg={percentBg}>
            {/* Show statusText (like 80%) as visible text for getByText */}
            <Text fontWeight="bold" fontSize="16px" color={percentColor}>
              {statusText ?? `${value}%`}
            </Text>
            {Arrow}
          </HStack>
        </HStack>
        <Progress
          value={value}
          colorScheme={colorScheme}
          bg={progressTrack}
          _filledTrack={{ bg: primary500 }}
          h="2"
          borderRadius={6}
          mb={1}
        />
        {subtitle ? (
          <Text fontSize="sm" color={subtitleColor}>
            {subtitle}
          </Text>
        ) : null}
      </Box>
    );
  }

  if (isStepProps(props)) {
    const { completedSteps = [], failedSteps = [], totalSteps } = props;
    const isSuccess = completedSteps.length === totalSteps && failedSteps.length === 0;
    const isFailed = failedSteps.length > 0;

    return (
      <Box bg={bgCard} rounded="lg" px={4} py={3} mx={2}>
        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <Text
            fontSize="18px"
            fontWeight="bold"
            color={isSuccess ? textPass : isFailed ? textFail : primaryText}
          >
            {isSuccess ? 'Successful!' : isFailed ? 'Progress Failed' : 'Step Progress'}
          </Text>
          {isFailed && (
            <Box w="6" h="6" rounded="full" alignItems="center" justifyContent="center">
              <Text fontSize="14px" color={palette.secondary?.['50']}>
                ✕
              </Text>
            </Box>
          )}
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space={2} w={widthProp}>
            <HStack alignItems="center" space={2}>
              <Box
                w="7"
                h="7"
                rounded="full"
                bg={isFailed ? textFail : borderPass}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="15px" color={palette.secondary?.['50']}>
                  {isFailed ? '✕' : '✔'}
                </Text>
              </Box>
              <Text fontSize="16px" bold color={secondaryText}>
                {`${completedSteps.length} of ${totalSteps} steps completed`}
              </Text>
            </HStack>
            <HStack space={1} alignItems="center">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                let bgColor = trackDefault;
                if (failedSteps.includes(stepNum)) {
                  bgColor = textFail;
                } else if (completedSteps.includes(stepNum)) {
                  bgColor = borderPass;
                }
                return (
                  <Box
                    key={index}
                    flex={1}
                    h="2"
                    rounded="full"
                    bg={bgColor}
                    testID="step-circle"
                  />
                );
              })}
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    );
  }

  if (props.variant === 'default' || props.variant === undefined) {
    const { completedSteps = 0, totalSteps = 1 } = props;
    const calculatedValue = (completedSteps / totalSteps) * 100;
    const autoLabel = `${completedSteps} of ${totalSteps} steps completed`;

    return (
      <Wrapper title={title} bgCard={bgCard} primaryText={primaryText}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space={1} w={widthProp}>
            <Text fontSize="18px" color={primaryText} testID="default-progress-label">
              {autoLabel}
            </Text>
            <Progress
              value={calculatedValue}
              colorScheme={colorScheme}
              bg={trackDefault}
              _filledTrack={{
                bg: resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500']),
              }}
              testID="progress-bar"
            />
          </VStack>
        </ScrollView>
      </Wrapper>
    );
  }

  if (isBarVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;
    return (
      <Wrapper title={title} bgCard={bgCard} primaryText={primaryText}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space={2} minW={totalSteps * 60} w={widthProp}>
            <Box position="relative" w="100%" h="10">
              <HStack
                position="absolute"
                top={-1}
                left={0}
                right={0}
                justifyContent="space-between"
                px={1}
              >
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <Box key={index} alignItems="center">
                    <Box
                      w="1"
                      h="2"
                      bg={resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500'])}
                      borderRadius="full"
                      testID="progress-bar"
                    />
                  </Box>
                ))}
              </HStack>
              <Box h="3" mt={2} bg={trackDefault} rounded="full" overflow="hidden">
                <Box
                  h="3"
                  bg={resolveThemeColor(theme, colorScheme, '400', palette.primary?.['400'])}
                  width={`${value}%`}
                  rounded="full"
                />
              </Box>
            </Box>
          </VStack>
        </ScrollView>
      </Wrapper>
    );
  }

  if (isLevelVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;
    return (
      <Wrapper title={title} bgCard={bgCard} primaryText={primaryText}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space={2} minW={totalSteps * 60} w={widthProp}>
            <Box position="relative" w="100%" h="6">
              <Box h="3" bg={trackDefault} rounded="full" overflow="hidden">
                <Box
                  h="3"
                  bg={resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500'])}
                  width={`${value}%`}
                  rounded="full"
                  testID="progress-bar"
                />
              </Box>
              <HStack
                position="absolute"
                top={-2.5}
                left={0}
                right={0}
                justifyContent="space-between"
                px={1}
              >
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <Box key={index} alignItems="center">
                    <Box
                      w="1"
                      h="4"
                      bg={resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500'])}
                      borderRadius="full"
                      testID="progress-bar"
                    />
                  </Box>
                ))}
              </HStack>
            </Box>
          </VStack>
        </ScrollView>
      </Wrapper>
    );
  }

  if (isTextVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;
    const currentLevel = Math.min(totalSteps, Math.max(1, Math.ceil((value / 100) * totalSteps)));
    const inactiveTextColor = isDark ? palette.secondary?.['300'] : palette.secondary?.['700'];

    return (
      <Wrapper title={title} bgCard={bgCard} primaryText={primaryText}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space={2} py={4} px={2} w={widthProp}>
            <HStack space={4} alignItems="flex-end">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const level = index + 1;
                const isCurrent = level === currentLevel;
                return (
                  <Box
                    key={index}
                    flex={1}
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    {isCurrent ? (
                      <Box
                        bg={resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500'])}
                        px={3}
                        py={2}
                        borderRadius="md"
                        position="relative"
                        zIndex={1}
                      >
                        <Text fontSize="18px" fontWeight="bold" color={palette.secondary?.['50']}>
                          {`Lv ${level}`}
                        </Text>
                        <Box
                          position="absolute"
                          bottom={-6}
                          left="50%"
                          ml="-6px"
                          borderLeftWidth={6}
                          borderRightWidth={6}
                          borderTopWidth={6}
                          borderLeftColor="transparent"
                          borderRightColor="transparent"
                          borderTopColor={resolveThemeColor(
                            theme,
                            colorScheme,
                            '500',
                            palette.primary?.['500'],
                          )}
                        />
                      </Box>
                    ) : (
                      <Text fontSize="18px" color={inactiveTextColor} fontWeight="medium">
                        {`Lv ${level}`}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </HStack>
            <Progress
              value={value}
              colorScheme={colorScheme}
              bg={palette.secondary?.['100']}
              _filledTrack={{
                bg: resolveThemeColor(theme, colorScheme, '500', palette.primary?.['500']),
              }}
              borderRadius="md"
              h="4"
            />
          </VStack>
        </ScrollView>
      </Wrapper>
    );
  }

  return null;
};

Wrapper.defaultProps = {
  title: '',
  bgCard: 'secondary.50',
  primaryText: 'secondary.900',
};

export default CustomProgressBar;
