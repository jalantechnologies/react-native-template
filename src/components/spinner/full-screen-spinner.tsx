import { SpinnerSize } from 'boilerplate-react-native/src/types/spinner';
import React from 'react';
import { View } from 'react-native';

import Spinner from './spinner';
import { styles } from './spinner.styles';

const FullScreenSpinner: React.FC = () => (
  <View style={styles.fullScreenContainer}>
    <Spinner size={SpinnerSize.LARGE} />
  </View>
);

export default FullScreenSpinner;
