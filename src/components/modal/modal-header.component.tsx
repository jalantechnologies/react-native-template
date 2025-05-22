import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { Icon } from 'native-base';
import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '../button/button';

import { useModalStyles } from './modal.styles';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  textAlign?: TextStyle['textAlign'];
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, textAlign }) => {
  const styles = useModalStyles();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { textAlign }]}>{title}</Text>
      {onClose && (
        <Button kind={ButtonKind.TERTIARY} onClick={onClose}>
          <Icon as={<MaterialIcons name="close" />} size="md" />
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
