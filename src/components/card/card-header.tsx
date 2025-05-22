import { Image, Text, Box } from 'native-base';
import { PropsWithChildren } from 'react';
import React from 'react';

import { useCardStyles } from './card.styles';

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  avatarSrc?: string;
}
export const CardHeader: React.FC<PropsWithChildren<CardHeaderProps>> = ({
  title,
  subtitle,
  avatarSrc,
  children: action,
}) => {
  const styles = useCardStyles();
  return (
    <Box style={[styles.header]}>
      {avatarSrc && <Image source={{ uri: avatarSrc }} alt="Avatar" style={styles.avatar} />}
      <Box style={styles.headerTextContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Box>
      {action && <Box ml={2}>{action}</Box>}
    </Box>
  );
};

CardHeader.defaultProps = {
  subtitle: '',
  avatarSrc: undefined,
};

export default CardHeader;
