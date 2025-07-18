import { Box, HStack, Progress, ScrollView, Text, useTheme, VStack } from 'native-base';
import React from 'react';

type BaseProps = {
  colorScheme?: keyof ReturnType<typeof useTheme>['colors'];
  trackColor?: string;
  label?: string;
};

type StepProps = BaseProps & {
  variant: 'step';
  completedSteps: number;
  totalSteps: number;
};

type DefaultOrOtherVariantsProps = BaseProps & {
  variant?: 'default' | 'level' | 'bar' | 'text';
  value?: number;
  totalSteps?: number;
  completedSteps?: number;
};

type LinearProgressProps = StepProps | DefaultOrOtherVariantsProps;

const isStepProps = (props: LinearProgressProps): props is StepProps => props.variant === 'step';

const isLevelVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'level';

const isBarVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'bar' || (!props.variant && 'value' in props && 'totalSteps' in props);

const isTextVariant = (props: LinearProgressProps): props is DefaultOrOtherVariantsProps =>
  props.variant === 'text';

const LinearProgressBar: React.FC<LinearProgressProps> = props => {
  const { colorScheme = 'primary', trackColor = 'coolGray.200' } = props;

  if (isStepProps(props)) {
    const { completedSteps, totalSteps } = props;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VStack space={2} w="304px">
          <HStack alignItems="center" space={2}>
            <Box
              w="8"
              h="8"
              rounded="full"
              bg="#087122"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="18px" color="#FFFFFF">
                ✔
              </Text>
            </Box>
            <Text fontSize="18px" bold color="coolGray.700">
              Step Progress ({completedSteps}/{totalSteps})
            </Text>
          </HStack>
          <HStack space={1} alignItems="center">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <Box
                key={index}
                flex={1}
                h="2"
                rounded="full"
                bg={index < completedSteps ? `${colorScheme}.600` : trackColor}
                testID={`step-bar-${index}`}
              />
            ))}
          </HStack>
          <Text fontSize="15px" color="coolGray.600">
            {completedSteps} of {totalSteps} steps completed
          </Text>
        </VStack>
      </ScrollView>
    );
  }

  if (props.variant === 'default' || props.variant === undefined) {
    const { completedSteps = 0, totalSteps = 1 } = props;
    const calculatedValue = (completedSteps / totalSteps) * 100;
    const autoLabel = `${completedSteps} of ${totalSteps} steps completed`;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VStack space={1} w="304px">
          <Text fontSize="18px">{autoLabel}</Text>
          <Progress
            value={calculatedValue}
            colorScheme={colorScheme}
            bg={trackColor}
            _filledTrack={{ bg: `${colorScheme}.500` }}
            testID="progress-bar"
          />
        </VStack>
      </ScrollView>
    );
  }

  if (isBarVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VStack space={2} minW={totalSteps * 60} w="304px">
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
                    bg="teal.700"
                    borderRadius="full"
                    testID={`tick-mark-${index}`}
                  />
                </Box>
              ))}
            </HStack>
            <Box h="3" mt={2} bg={trackColor} rounded="full" overflow="hidden">
              <Box h="3" bg={`${colorScheme}.400`} width={`${value}%`} rounded="full" />
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    );
  }

  if (isLevelVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <VStack space={2} minW={totalSteps * 60} w="304px">
          <Box position="relative" w="100%" h="6">
            <Box h="3" bg={trackColor} rounded="full" overflow="hidden">
              <Box h="3" bg={`${colorScheme}.500`} width={`${value}%`} rounded="full" />
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
                    bg={`${colorScheme}.500`}
                    borderRadius="full"
                    testID={`level-box-${index}`}
                  />
                </Box>
              ))}
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    );
  }

  if (isTextVariant(props)) {
    const { value = 0, totalSteps = 5 } = props;
    const currentLevel = Math.min(totalSteps, Math.max(1, Math.ceil((value / 100) * totalSteps)));

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={4} alignItems="flex-end" py={4} px={2}>
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
                    bg={`${colorScheme}.500`}
                    px={3}
                    py={2}
                    borderRadius="md"
                    position="relative"
                    zIndex={1}
                  >
                    <Text fontSize="18px" fontWeight="bold" color="black">
                      Lv {level}
                    </Text>
                    <Box
                      position="absolute"
                      bottom={-6}
                      left="50%"
                      ml="10%"
                      borderLeftWidth={6}
                      borderRightWidth={6}
                      borderTopWidth={6}
                      borderLeftColor="transparent"
                      borderRightColor="transparent"
                      borderTopColor={`${colorScheme}.500`}
                    />
                  </Box>
                ) : (
                  <Text fontSize="18px" color="gray.500" fontWeight="medium">
                    Lv {level}
                  </Text>
                )}
              </Box>
            );
          })}
        </HStack>
      </ScrollView>
    );
  }

  return null;
};

export default LinearProgressBar;
