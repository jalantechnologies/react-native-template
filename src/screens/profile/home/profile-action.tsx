import React from 'react';
import { List, useTheme } from 'react-native-paper';
import ChevronRightIcon from 'react-native-template/assets/icons/chevron-right.svg';

interface ProfileActionProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

const ProfileAction: React.FC<ProfileActionProps> = ({ title, icon, onPress }) => {
  const theme = useTheme() as any;

  return (
    <List.Item
      title={title}
      left={() => icon}
      right={props => (
        <ChevronRightIcon
          {...props}
          width={20}
          height={20}
          fill={theme.colors.primary}
        />
      )}
      onPress={onPress}
      titleStyle={{ fontSize: 16, fontWeight: '500' }}
    />
  );
};

export default ProfileAction;
