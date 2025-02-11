import React, {PropsWithChildren} from 'react';
import { Text } from 'react-native';

const CardTitle: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default CardTitle;
