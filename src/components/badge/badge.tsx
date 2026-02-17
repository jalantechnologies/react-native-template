import React from 'react';
import { Badge as PaperBadge } from 'react-native-paper';

interface AppBadgeProps {
  children?: string | number;
  visible?: boolean;
  size?: number;
  style?: any;
}

const AppBadge: React.FC<AppBadgeProps> = ({ children, visible = true, size, style }) => (
  <PaperBadge visible={visible} size={size} style={style}>
    {children}
  </PaperBadge>
);

export default AppBadge;
