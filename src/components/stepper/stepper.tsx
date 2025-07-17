import { Text, useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface StepperProps {
  numberOfSteps: number;
  lastActivated: number;
  lastFailedStep?: number;
  stepDetailsList?: string[];
  successColor?: string;
  failedColor?: string;
  hoverBackground?: string;
  hoverTextColor?: string;
  width?: number;
}

const Stepper: React.FC<StepperProps> = ({
  numberOfSteps,
  lastActivated,
  lastFailedStep,
  stepDetailsList = [],
  successColor,
  failedColor,
  hoverBackground,
  hoverTextColor,
  width = 304, // Default width
}) => {
  const theme = useTheme();
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const getColor = (key: string) => {
    if (!key) return null;
    if (key.includes('.')) {
      const [colorName, shade] = key.split('.');
      const colorGroup = theme.colors[colorName as keyof typeof theme.colors];
      if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
        return (colorGroup as any)[shade];
      }
    } else {
      const color = theme.colors[key as keyof typeof theme.colors];
      if (typeof color === 'string') {
        return color;
      }
    }
    return null;
  };

  const resolvedSuccess =
    (successColor && getColor(successColor)) || theme.colors.success?.[500] || 'green';

  const resolvedFailed =
    (failedColor && getColor(failedColor)) || theme.colors.error?.[500] || 'red';

  const resolvedHoverBg =
    (hoverBackground && getColor(hoverBackground)) || theme.colors.coolGray?.[100] || 'white';

  const resolvedHoverText =
    (hoverTextColor && getColor(hoverTextColor)) || theme.colors.coolGray?.[900] || 'black';

  return (
    <View style={{ width }}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          <Text style={{ color: resolvedSuccess }}>{`${lastActivated}`}</Text>
          {` of ${numberOfSteps} steps completed`}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {Array.from({ length: numberOfSteps }).map((_, i) => {
            const isLast = i === numberOfSteps - 1;
            const isCompleted = i + 1 <= lastActivated;
            const isFailed = lastFailedStep === i + 1;

            const bgColor = isFailed ? resolvedFailed : isCompleted ? resolvedSuccess : 'white';

            const borderColor = isFailed || isCompleted ? bgColor : '#9ca3af';
            const stepText = isFailed ? '✕' : isCompleted ? '✓' : `${i + 1}`;

            return (
              <View key={i} style={styles.stepItem}>
                <View style={styles.circleWrapper}>
                  <TouchableOpacity
                    onPress={() => setActiveTooltip(activeTooltip === i ? null : i)}
                    activeOpacity={0.7}
                    style={styles.touchableArea}
                  >
                    <View style={[styles.circle, { backgroundColor: bgColor, borderColor }]}>
                      <Text
                        style={[styles.text, (isCompleted || isFailed) && styles.completedText]}
                      >
                        {stepText}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Tooltip */}
                  {activeTooltip === i && (
                    <View style={styles.tooltipContainer}>
                      <View style={[styles.tooltipArrow, { borderBottomColor: resolvedHoverBg }]} />
                      <View style={[styles.tooltipBox, { backgroundColor: resolvedHoverBg }]}>
                        <Text style={[styles.tooltipText, { color: resolvedHoverText }]}>
                          {stepDetailsList[i] || `Step ${i + 1} details`}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {!isLast && <View style={styles.dottedLine} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 1,
    paddingHorizontal: 20,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    lineHeight: 20,
  },
  container: {
    // height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
    // backgroundColor: "green"
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  touchableArea: {
    padding: 8,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
  completedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dottedLine: {
    width: 20,
    height: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginHorizontal: 4,
  },
  tooltipContainer: {
    position: 'absolute',
    top: 40,
    left: -75,
    right: -75,
    alignItems: 'center',
    zIndex: 1000,
  },
  tooltipBox: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 100,
    maxWidth: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: -1,
  },
});

Stepper.defaultProps = {
  stepDetailsList: [],
  successColor: undefined,
  failedColor: undefined,
  hoverBackground: undefined,
  hoverTextColor: undefined,
  lastFailedStep: undefined,
  width: 304,
};

export default Stepper;
