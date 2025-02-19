import { render } from '@testing-library/react-native';
import React from 'react';

import Avatar from '../src/components/avatar/avatar';
import { AVATAR_SIZE } from '../src/components/avatar/constants';

// Mock Image component error handling
jest.mock('react-native/Libraries/Image/Image', () => {
  const ActualImage = jest.requireActual('react-native/Libraries/Image/Image');
  return class Image extends ActualImage {
    static getSize(uri: string, success: (width: number, height: number) => void): void {
      success(100, 100);
    }
  };
});

describe('Avatar Component', () => {
  const mockIcon = <svg data-testid="fallback-icon" />;

  it('renders image when src is provided', () => {
    const { getByRole } = render(<Avatar src="https://example.com/avatar.jpg" />);
    expect(getByRole('image')).toBeTruthy();
  });

  it('shows initials when image fails to load', () => {
    const { getByText } = render(<Avatar src="invalid.jpg" initials="JD" />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('displays fallback icon when no image/initials', () => {
    const { getByTestId } = render(<Avatar fallbackIcon={mockIcon} />);
    expect(getByTestId('fallback-icon')).toBeTruthy();
  });

  it('handles different sizes correctly', () => {
    const { getByTestId } = render(<Avatar size="large" testID="avatar" />);
    const avatar = getByTestId('avatar');
    expect(avatar.props.style.width).toBe(AVATAR_SIZE.large);
  });

  it('applies circle shape styling', () => {
    const { getByTestId } = render(<Avatar testID="avatar" shape="circle" />);
    const avatar = getByTestId('avatar');
    expect(avatar.props.style.borderRadius).toBe(AVATAR_SIZE.medium / 2);
  });
});
