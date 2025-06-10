import { StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  outerCircle: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  innerCircle: {
    height: scale(11),
    width: scale(11),
    borderRadius: scale(5.5),
  },
  label: {
    fontSize: moderateScale(16),
  },
});
