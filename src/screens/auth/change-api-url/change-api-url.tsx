import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const { colors } = useTheme();

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  return (
    isNonProdEnv && (
      <>
        <View style={styles.buttonContainer}>
          <IconButton
            accessibilityLabel="Change API URL"
            icon={({ color, size }) => <GearIcon height={size} width={size} fill={color} />}
            iconColor={colors.secondary}
            onPress={() => setIsChangeAPIUrlModalOpen(true)}
            size={24}
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
