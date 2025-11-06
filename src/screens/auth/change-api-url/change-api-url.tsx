import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { IconButton, useTheme } from 'react-native-paper';
import GearIcon from 'react-native-template/assets/icons/gear.svg';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';

  const theme = useTheme();

  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  const gearIcon = useMemo(
    () => <GearIcon width={24} height={24} fill={theme.colors.onPrimary} />,
    [theme.colors.onPrimary],
  );

  if (!isNonProdEnv) {
    return null;
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      top: 55,
      right: 30,
      zIndex: 1000,
    },
  });

  return (
    <>
      <View style={styles.buttonContainer}>
        <IconButton icon={() => gearIcon} onPress={() => setIsChangeAPIUrlModalOpen(true)} />
      </View>
      <ChangeApiUrlModal
        handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
        isModalOpen={isChangeAPIUrlModalOpen}
      />
    </>
  );
};

export default ChangeApiUrlButton;
