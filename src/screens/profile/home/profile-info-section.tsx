import { Box, Heading, Text } from 'native-base';
import React from 'react';
import { IconButton,useTheme } from 'react-native-paper';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Avatar } from 'react-native-template/src/components';


import { Account, Nullable } from '../../../types';

import type { AppTheme } from '@/theme';

interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
  handleEditProfilePress: () => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  accountDetails,
  handleEditProfilePress,
}) => {
  const theme = useTheme<AppTheme>();

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
            <EditIcon fill={theme.colors.primary} />
          )}
          size={theme.iconSizes.md}
          onPress={handleEditProfilePress}
        />
      </Box>
      <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
    </Box>
  );
};

export default ProfileInfoSection;
