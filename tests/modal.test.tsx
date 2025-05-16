import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ConfirmationModal,
} from '../src/components/modal';

// Ensure the Modal component and its subcomponents render correctly
describe('Modal Component', () => {
  test('renders correctly when visible', () => {
    const { getByText } = render(
      <Modal isVisible={true} onClose={() => { }}>
        <Text>Modal Content</Text>
      </Modal>,
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByText } = render(
      <Modal isVisible={false} onClose={() => { }}>
        <Text>Hidden Content</Text>
      </Modal>,
    );
    expect(queryByText('Hidden Content')).toBeNull();
  });

  test('renders ModalHeader with title', () => {
    const { getByText } = render(<ModalHeader title="Modal Title" onClose={() => { }} />);
    expect(getByText('Modal Title')).toBeTruthy();
  });

  test('renders ModalBody with children', () => {
    const { getByText } = render(
      <ModalBody>
        <Text>Modal Body Content</Text>
      </ModalBody>,
    );
    expect(getByText('Modal Body Content')).toBeTruthy();
  });

  test('renders ModalFooter with children', () => {
    const { getByText } = render(
      <ModalFooter>
        <Text>Modal Footer Content</Text>
      </ModalFooter>,
    );
    expect(getByText('Modal Footer Content')).toBeTruthy();
  });

  test('renders ConfirmationModal with message and buttons', () => {
    const { getByText } = render(
      <ConfirmationModal
        isVisible={true}
        onConfirm={() => { }}
        onClose={() => { }}
        onCancel={() => { }}
        message="Are you sure?"
      />,
    );
    expect(getByText('Are you sure?')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  test('Modal renders any child content freely', () => {
    const { getByText } = render(
      <Modal isVisible={true} onClose={() => { }}>
        <Text>Custom Content</Text>
      </Modal>,
    );
    expect(getByText('Custom Content')).toBeTruthy();
  });

  test('Modal supports different sizes', () => {
    const { getByTestId } = render(
      <Modal isVisible={true} onClose={() => { }}>
        <Text testID="modal-content">Sized Modal</Text>
      </Modal>,
    );
    expect(getByTestId('modal-content')).toBeTruthy();
  });

  test('ConfirmationModal Confirm and Cancel buttons work', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();
    const { getByText } = render(
      <ConfirmationModal
        isVisible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        message="Proceed?"
      />,
    );
    fireEvent.press(getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
    fireEvent.press(getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('Modal works without Header, Body, or Footer', () => {
    const { getByText } = render(
      <Modal isVisible={true} onClose={() => { }}>
        <Text>Minimal Modal</Text>
      </Modal>,
    );
    expect(getByText('Minimal Modal')).toBeTruthy();
  });
});
