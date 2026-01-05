import { Box, Heading, Text } from 'native-base';
import { IconButton,useTheme } from 'react-native-paper';
import React from 'react';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Avatar } from 'react-native-template/src/components';


import { Account, Nullable } from '../../../types';

interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
  handleEditProfilePress: () => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  accountDetails,
  handleEditProfilePress,
}) => {
  const theme = useTheme();

  return (
    <Box alignItems="center">
      <Box>
        <Avatar initials={accountDetails?.initials()} />
      </Box>
      <Box
        borderRadius="full"
        p={1}
        flexDirection="row"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mr={2}>{accountDetails?.displayName()}</Heading>
        <IconButton
          icon={() => (
            <EditIcon width={20} height={20} fill={theme.colors.primary} />
          )}
          size={20}
          onPress={handleEditProfilePress}
        />
      </Box>
      <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
    </Box>
  );
};

export default ProfileInfoSection;
