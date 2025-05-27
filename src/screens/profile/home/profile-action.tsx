import ChevronRightIcon from 'boilerplate-react-native/assets/icons/chevron-right.svg';
import { Pressable, HStack, Heading, IPressableProps, useTheme } from 'native-base';
import React from 'react';

interface ProfileActionProps extends IPressableProps {
  title: string;
  icon: Element;
}

const ProfileAction: React.FC<ProfileActionProps> = ({ title, icon, ...props }) => {
  const theme = useTheme();

  return (
    <Pressable _pressed={{ bg: 'coolGray.200' }} py={2} {...props}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack space={2}>
          {icon}
          <Heading size={'sm'}>{title}</Heading>
        </HStack>
        <ChevronRightIcon width={20} height={20} fill={theme.colors.primary['500']} />
      </HStack>
    </Pressable>
  );
};

export default ProfileAction;
