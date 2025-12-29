import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ChevronRightIcon from 'react-native-template/assets/icons/chevron-right.svg';

interface ProfileActionProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

const ProfileAction: React.FC<ProfileActionProps> = ({
  title,
  icon,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 12,
        paddingHorizontal: 4,
        backgroundColor: pressed ? colors.surfaceVariant : 'transparent',
      })}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {icon}
          <Text variant="titleMedium">{title}</Text>
        </View>

        <ChevronRightIcon
          width={20}
          height={20}
          fill={colors.primary}
        />
      </View>
    </Pressable>
  );
};

export default ProfileAction;
