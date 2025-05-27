import { SpinnerSize, SpinnerTypes } from 'boilerplate-react-native/src/types/spinner';
import { useThemeColor } from 'boilerplate-react-native/src/utils';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './spinner.styles';

interface SpinnerProps {
  size?: SpinnerSize;
  type?: SpinnerTypes;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = SpinnerSize.SMALL,
  type = SpinnerTypes.PRIMARY,
}) => {
  const color = useThemeColor(type);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Spinner.defaultProps = {
  size: SpinnerSize.SMALL,
  type: SpinnerTypes.PRIMARY,
};

export default Spinner;
