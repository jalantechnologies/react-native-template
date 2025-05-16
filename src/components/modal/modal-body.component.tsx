import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { styles } from './modal.styles';

const ModalBody: React.FC<PropsWithChildren> = ({ children }) => (
    <View style={styles.modalBody}>{children}</View>
);

export default ModalBody;
