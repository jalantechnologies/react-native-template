import React from 'react';
import { Avatar } from 'react-native-paper';

interface AppAvatarProps {
  label: string;
  size?: number;
  style?: any;
}

const AppAvatar: React.FC<AppAvatarProps> = ({ label, size = 40, style }) => (
  <Avatar.Text size={size} label={label} style={style} />
);

export default AppAvatar;
