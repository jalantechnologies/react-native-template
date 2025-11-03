import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme();

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  return (
    isNonProdEnv && (
      <>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={() => (
              <GearIcon width={24} height={24} fill={theme.colors.onPrimary} />
            )}
            onPress={() => setIsChangeAPIUrlModalOpen(true)}
          />
        </View>
        <ChangeApiUrlModal
          handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
          isModalOpen={isChangeAPIUrlModalOpen}
        />
      </>
    )
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top: 55,
    right: 30,
    position: 'absolute',
    zIndex: 1000,
  },
});

export default ChangeApiUrlButton;
