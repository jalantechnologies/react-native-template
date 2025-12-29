import React from 'react';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { View } from 'react-native';
import { Account, Nullable } from '../../../types';
import { IconButton, Text, useTheme,Avatar } from 'react-native-paper';
import { useStyles}  from './styles'
interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
  handleEditProfilePress: () => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  accountDetails,
  handleEditProfilePress,
}) => {
  const theme = useTheme();
  const styles = useStyles()

  return (
    <View style={{ alignItems: "center" }} >
      <View>
        <Avatar.Text size={50} label={accountDetails?.initials()} style={styles.avatar} color={theme.colors.primary} />
      </View>
      <View style={styles.profile}>
      
        <Text variant='titleLarge'>{accountDetails?.displayName()}</Text>
        <IconButton
          icon={() => (
            <EditIcon width={20} height={20} fill={theme.colors.primary} />
          )}
          size={20}
          onPress={handleEditProfilePress}
        />
      </View>
      <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
    </View>
  );
};

export default ProfileInfoSection;
