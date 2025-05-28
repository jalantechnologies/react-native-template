import { Button } from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';

import ChangeApiUrlModal from './change-api-url-modal';

const ChangeApiUrlButton = () => {
  const isNonProdEnv = Config.ENVIRONMENT !== 'production';
  const [isChangeAPIUrlModalOpen, setIsChangeAPIUrlModalOpen] = useState(false);

  if (!isNonProdEnv) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isNonProdEnv && (
        <>
          <Button onClick={() => setIsChangeAPIUrlModalOpen(true)} kind={ButtonKind.SECONDARY}>
            Change API URL
          </Button>
          <ChangeApiUrlModal
            setIsModalOpen={setIsChangeAPIUrlModalOpen}
            isModalOpen={isChangeAPIUrlModalOpen}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
});

export default ChangeApiUrlButton;
