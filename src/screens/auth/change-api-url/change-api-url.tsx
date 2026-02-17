import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';
  const theme = useTheme() as any;

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <IconButton
          icon={({ size, color }) => <GearIcon width={size} height={size} fill={theme.customColors.secondary[100]} />}
          onPress={() => setIsChangeAPIUrlModalOpen(true)}
        />
      </View>
      <ChangeApiUrlModal
        handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
        isModalOpen={isChangeAPIUrlModalOpen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 8,
  },
});

export default ChangeApiUrlButton;
