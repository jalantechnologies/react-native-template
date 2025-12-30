import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { useTheme, IconButton } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const useChangeApiUrlStyles = () => {

  return StyleSheet.create({
    buttonContainer: {
      paddingTop: Number(2),
    },
  });
};

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme();
  const styles = useChangeApiUrlStyles();

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
              <GearIcon
                width={24}
                height={24}
                fill={theme.colors.secondaryContainer}
              />
            )}
            size={24}
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

export default ChangeApiUrlButton;
