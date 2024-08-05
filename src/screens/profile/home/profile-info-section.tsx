import { HStack, Icon, Box, Heading, Text } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Account, Nullable } from '../../../types';

interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({ accountDetails }) => {
  return (
    <HStack space={4} alignItems={'center'}>
      <Icon as={<MaterialIcons name="account-circle" />} size={50} />
      <Box>
        <Heading>{accountDetails?.displayName()}</Heading>
        <Text>{accountDetails?.phoneNumber.getFormattedPhoneNumber()}</Text>
      </Box>
    </HStack>
  );
};

export default ProfileInfoSection;
