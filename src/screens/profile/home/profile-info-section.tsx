import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import EditIcon from 'react-native-template/assets/icons/edit.svg';

import { AppAvatar } from '../../../components';
import { Account, Nullable } from '../../../types';

interface ProfileInfoSectionProps {
  accountDetails: Nullable<Account>;
  handleEditProfilePress: () => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  accountDetails,
  handleEditProfilePress,
}) => {
  const theme = useTheme() as any;

  return (
    <View style={styles.container}>
      <AppAvatar
        size={80}
        label={accountDetails?.initials() || '??'}
        style={styles.avatar}
      />
      <View style={styles.nameRow}>
        <Text style={[styles.name, { fontSize: 24, fontWeight: 'bold' }]}>
          {accountDetails?.displayName()}
        </Text>
        <IconButton
          icon={({ size, color }) => <EditIcon width={size} height={size} fill={theme.colors.primary} />}
          onPress={handleEditProfilePress}
        />
      </View>
      <Text style={{ fontSize: 16 }}>
        {accountDetails?.phoneNumber.getFormattedPhoneNumber()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginRight: 8,
  },
});

export default ProfileInfoSection;
