import React, { PropsWithChildren } from 'react';
import { View} from 'react-native';
import { useStyles}  from './styles'
const ProfileLayout = ({ children }: PropsWithChildren) => {
  const styles = useStyles()

  return (
    <View style={styles.profileLayout}>
      {children}
    </View>
  );
};

export default ProfileLayout;
