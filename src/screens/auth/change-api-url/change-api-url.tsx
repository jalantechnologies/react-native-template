import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, MD3Theme, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme();
  const styles = useStyles(theme);

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  const renderIcon = useCallback(
    ({ size }: { size: number }) => (
      <GearIcon height={size} width={size} fill={theme.colors.onPrimary} />
    ),
    [theme.colors.onPrimary],
  );

  if (!isNonProdEnv) {
    return null;
  }

  return (
    isNonProdEnv && (
      <>
        <View style={styles.buttonContainer}>
          <IconButton
            accessibilityLabel="Change API URL"
            icon={renderIcon}
            iconColor={theme.colors.onPrimary}
            onPress={() => setIsChangeAPIUrlModalOpen(true)}
            size={theme.roundness * 6}
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

const useStyles = (theme: MD3Theme) => {
  const overlayZIndex = theme.roundness * 250;
  const rightSpacing = theme.roundness * 2;
  const topSpacing = theme.roundness * 4;

  return StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      top: topSpacing,
      right: rightSpacing,
      zIndex: overlayZIndex,
    },
  });
};

export default ChangeApiUrlButton;
