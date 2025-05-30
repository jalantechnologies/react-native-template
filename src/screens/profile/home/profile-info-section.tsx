import EditIcon from 'boilerplate-react-native/assets/icons/edit.svg';
import { Avatar, Button } from 'boilerplate-react-native/src/components';
import { ButtonKind, ButtonSize } from 'boilerplate-react-native/src/types/button';
import { Box, Heading, Text, useTheme } from 'native-base';
import React from 'react';

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
        <Button
          onClick={handleEditProfilePress}
          kind={ButtonKind.TERTIARY}
          size={ButtonSize.COMPACT}
        >
          <EditIcon width={20} height={20} fill={theme.colors.primary['500']} />
        </Button>
      </Box>
      <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
    </Box>
  );
};

export default ProfileInfoSection;
