import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Tag } from '../src/components/tag';

describe('Tag Component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(<Tag>Test Tag</Tag>);
    expect(getByText('Test Tag')).toBeTruthy();
  });

  test('calls onRemove callback when close button is pressed', () => {
    const mockOnRemove = jest.fn();
    const { getByText } = render(<Tag onRemove={mockOnRemove}>Removable Tag</Tag>);

    // Assuming the close icon displays as "✕"
    const closeButton = getByText('✕');
    fireEvent.press(closeButton);
    expect(mockOnRemove).toHaveBeenCalled();
  });

  test('renders with custom variant and shape', () => {
    // Since styling is not applied yet, we verify rendering and props remain intact.
    const { getByText } = render(
      <Tag variant="secondary" shape="square">
        Custom Tag
      </Tag>,
    );
    expect(getByText('Custom Tag')).toBeTruthy();
  });
});
