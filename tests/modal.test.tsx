import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import Modal from '../src/components/modal/Modal';

describe('Modal Component', () => {
  test('renders when visible', () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        header={<Text>Header</Text>}
        body={<Text>Body</Text>}
        footer={<Text>Footer</Text>}
      />,
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  test('does not render when not visible', () => {
    const { queryByText } = render(
      <Modal
        isOpen={false}
        onClose={() => {}}
        header={<Text>Header</Text>}
        body={<Text>Body</Text>}
        footer={<Text>Footer</Text>}
      />,
    );
    expect(queryByText('Header')).toBeNull();
    expect(queryByText('Body')).toBeNull();
    expect(queryByText('Footer')).toBeNull();
  });

  test('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose} header={<Text>Header</Text>} />,
    );
    fireEvent.press(getByText('X'));
    expect(onClose).toHaveBeenCalled();
  });
});
