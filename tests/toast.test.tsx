import { render } from '@testing-library/react-native';
import React from 'react';

import { Toast } from '../src/components/toast';

jest.useFakeTimers();

describe('Toast Component', () => {
  test('does not render when isVisible is false', () => {
    const { queryByText } = render(<Toast isVisible={false} message="Test Toast" />);
    expect(queryByText('Test Toast')).toBeNull();
  });

  test('renders correctly when isVisible is true', () => {
    const { getByText } = render(<Toast isVisible message="Test Toast" />);
    expect(getByText('Test Toast')).toBeTruthy();
  });

  test('auto dismisses after specified time', () => {
    const mockOnDismiss = jest.fn();
    render(
      <Toast
        isVisible
        message="Auto Dismiss Toast"
        autoDismiss
        dismissAfter={3000}
        onDismiss={mockOnDismiss}
      />,
    );
    jest.advanceTimersByTime(3000);
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  test('does not call onDismiss if autoDismiss is false', () => {
    const mockOnDismiss = jest.fn();
    render(
      <Toast
        isVisible
        message="Persistent Toast"
        autoDismiss={false}
        dismissAfter={3000}
        onDismiss={mockOnDismiss}
      />,
    );
    jest.advanceTimersByTime(3000);
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });
});
