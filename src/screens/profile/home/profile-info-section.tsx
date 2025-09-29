import { Box, Heading, Text, useTheme } from 'native-base';
import React from 'react';
import EditIcon from 'react-native-template/assets/icons/edit.svg';
import { Avatar, Button } from 'react-native-template/src/components';
import { ButtonKind, ButtonSize } from 'react-native-template/src/types/button';

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
        <Button onClick={handleEditProfilePress} kind={ButtonKind.LINK} size={ButtonSize.COMPACT}>
          <EditIcon width={20} height={20} fill={theme.colors.primary['500']} />
        </Button>
      </Box>
      <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
    </Box>
  );
};

export default ProfileInfoSection;
