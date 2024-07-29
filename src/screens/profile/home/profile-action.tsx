import React from 'react';
import { Pressable, HStack, Heading, IPressableProps, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ProfileActionProps extends IPressableProps {
  title: string;
  icon: string;
}

const ProfileAction: React.FC<ProfileActionProps> = ({ title, icon, ...props }) => {
  return (
    <Pressable _pressed={{ bg: 'coolGray.200' }} py={2} {...props}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack space={2}>
          <Icon as={<MaterialIcons name={icon} />} size={5} />
          <Heading size={'sm'}>{title}</Heading>
        </HStack>
        <Icon as={<MaterialIcons name={'chevron-right'} />} size={5} />
      </HStack>
    </Pressable>
  );
};

export default ProfileAction;
