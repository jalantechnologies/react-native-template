import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, Button } from 'react-native';

import { Modal, ModalHeader, ModalBody, ModalFooter } from '../src/components/modal';

// Ensure the Modal component and its subcomponents render correctly
describe('Modal Component', () => {
  test('renders correctly when visible', () => {
    const { getByText } = render(
      <Modal isVisible={true} onClose={() => {}}>
        <Text>Modal Content</Text>
      </Modal>,
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByText } = render(
      <Modal isVisible={false} onClose={() => {}}>
        <Text>Hidden Content</Text>
      </Modal>,
    );
    expect(queryByText('Hidden Content')).toBeNull();
  });

  test('renders ModalHeader with title', () => {
    const { getByText } = render(
      <ModalHeader>
        <Text>Modal Title</Text>
      </ModalHeader>,
    );
    expect(getByText('Modal Title')).toBeTruthy();
  });

  test('renders ModalBody with content', () => {
    const { getByText } = render(
      <ModalBody>
        <Text>Body Content</Text>
      </ModalBody>,
    );
    expect(getByText('Body Content')).toBeTruthy();
  });

  test('renders ModalFooter with buttons', () => {
    const { getByText } = render(
      <ModalFooter>
        <Button title="Confirm" onPress={() => {}} />
        <Button title="Cancel" onPress={() => {}} />
      </ModalFooter>,
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });
});
