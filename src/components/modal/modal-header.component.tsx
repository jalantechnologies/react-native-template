import Close from 'boilerplate-react-native/assets/icons/close.svg';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { useTheme } from 'native-base';
import React from 'react';
import { View, Text, TextStyle } from 'react-native';

import Button from '../button/button';

import { useModalStyles } from './modal.styles';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  textAlign?: TextStyle['textAlign'];
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, textAlign }) => {
  const styles = useModalStyles();

  const theme = useTheme();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { textAlign }]}>{title}</Text>
      {onClose && (
        <Button kind={ButtonKind.TERTIARY} onClick={onClose}>
          <Close fill={theme.colors.primary['500']} />
        </Button>
      )}
    </View>
  );
};

ModalHeader.defaultProps = {
  onClose: undefined,
  textAlign: 'center',
};

export default ModalHeader;
