import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme();
  const spacing = (theme as any).spacing;
  const iconSize = (theme as any).iconSize;
  const zIndex = (theme as any).zIndex;

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      top: spacing.buttonTop,
      right: spacing.buttonRight,
      position: 'absolute',
      zIndex: zIndex.modal,
    },
  });

  return (
    isNonProdEnv && (
      <>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={() => (
              <GearIcon width={iconSize.medium} height={iconSize.medium} fill={theme.colors.onPrimary} />
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

export default ChangeApiUrlButton;
