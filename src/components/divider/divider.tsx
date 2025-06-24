import React from 'react';
import { View } from 'react-native';

import { useDividerStyles, DividerOrientation } from './divider.styles';

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  testID?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation, thickness, testID, ...rest }) => {
  const styles = useDividerStyles({
    orientation: orientation ?? DividerOrientation.Horizontal,
    thickness: thickness ?? 1,
  });

  return <View testID={testID ?? 'divider'} style={styles.divider} {...rest} />;
};

Divider.defaultProps = {
  orientation: DividerOrientation.Horizontal,
  thickness: 1,
  testID: 'divider',
};

export default Divider;
