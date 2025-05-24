import { Avatar, Button } from 'boilerplate-react-native/src/components';
import { ButtonKind, ButtonSize } from 'boilerplate-react-native/src/types/button';
import { Box, Heading, Icon, Text } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Account, Nullable } from '../../../types';

interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
  handleEditProfilePress: () => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  accountDetails,
  handleEditProfilePress,
}) => {
  return (
    <>
      <Box alignItems="center">
        <Box>
          <Avatar initials={accountDetails?.displayName().slice(0, 2).toUpperCase()} />
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
            <Icon as={<MaterialIcons name="edit" />} color="primary" />
          </Button>
        </Box>
        <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
      </Box>
    </>
  );
};

export default ProfileInfoSection;
