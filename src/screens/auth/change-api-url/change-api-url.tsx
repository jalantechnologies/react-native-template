import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import type { AppTheme } from '../../../theme/app-theme';
import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme<AppTheme>();
  const styles = useStyles(theme);

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  const gearIcon = useCallback(
    ({ size }: { size: number }) => (
      <GearIcon height={size} width={size} fill={theme.colors.onPrimary} />
    ),
    [theme.colors.onPrimary],
  );

  if (!isNonProdEnv) {
    return null;
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <IconButton
          accessibilityLabel="Change API URL"
          icon={gearIcon}
          iconColor={theme.colors.onPrimary}
          onPress={() => setIsChangeAPIUrlModalOpen(true)}
          size={theme.iconSizes.medium}
        />
      </View>
      <ChangeApiUrlModal
        handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
        isModalOpen={isChangeAPIUrlModalOpen}
      />
    </>
  );
};

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      right: theme.spacing.sm,
      top: theme.spacing.md,
      zIndex: theme.overlay.zIndex,
    },
  });

export default ChangeApiUrlButton;
