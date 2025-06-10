import GearIcon from 'boilerplate-react-native/assets/icons/gear.svg';
import { Button } from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';
  const { colors } = useTheme();
  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  // Create dynamic styles using theme colors
  const dynamicStyles = StyleSheet.create({
    fabContainer: {
      backgroundColor: colors.primary[100],
      borderWidth: 1,
      borderColor: colors.primary[300],
    },
    gearIcon: {
      color: colors.primary[700],
    },
  });

  if (!isNonProdEnv) {
    return null;
  }

  return (
    <>
      <View style={[styles.fabContainer, dynamicStyles.fabContainer]}>
        <Button
          onClick={() => setIsChangeAPIUrlModalOpen(true)}
          kind={ButtonKind.TERTIARY}
          accessibilityLabel="Change API URL"
          accessibilityHint="Opens modal to change the API base URL"
          style={styles.fabButton}
        >
          <GearIcon width={24} height={24} fill={dynamicStyles.gearIcon.color} />
        </Button>
      </View>
      <ChangeApiUrlModal
        handleModalClose={() => setIsChangeAPIUrlModalOpen(false)}
        isModalOpen={isChangeAPIUrlModalOpen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    width: 50,
    height: 50,
    borderRadius: 28,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
});

export default ChangeApiUrlButton;
