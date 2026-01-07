import React, { useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { useTheme, IconButton } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';
import { useChangeApiUrlStyles } from './change-api-url.styles';

import type { AppTheme } from '@/theme';


const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme<AppTheme>();
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
            icon={GearIcon}
            iconColor={theme.colors.secondaryContainer}
            size={theme.iconSizes.md}
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
