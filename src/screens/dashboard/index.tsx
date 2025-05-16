import { Modal } from 'boilerplate-react-native/src/components';
import { ModalBody, ModalClose, ModalHeader } from 'boilerplate-react-native/src/components/modal';
import { Text } from 'native-base';
import React from 'react';

import TaskSection from './task-section';

const Dashboard = () => {
  return (
    <Modal isVisible={true} onClose={() => console.log('closing the modal')}>
      <ModalHeader title="Modal Header Title" onClose={() => console.log('closing the modal from header')} />
      <ModalBody>
        <Text>Hello</Text>
      </ModalBody>
    </Modal>
  );
};

export default Dashboard;
