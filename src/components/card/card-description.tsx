import React, {PropsWithChildren} from 'react';
import { Text } from 'react-native';

const CardDescription: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default CardDescription;
