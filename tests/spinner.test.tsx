import { render } from '@testing-library/react-native';
import React from 'react';

import { Spinner } from '../src/components/spinner';

jest.useFakeTimers();

describe('Spinner Component', () => {
  test('renders correctly with default props', () => {
    const { toJSON } = render(<Spinner />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('applies custom size and color', () => {
    const customSize = 60;
    const customColor = 'red';
    const { toJSON } = render(<Spinner size={customSize} color={customColor} />);
    const tree = toJSON();
    // Check that width, height, and borderColor are applied
    if (!tree || Array.isArray(tree) || !('props' in tree)) {
      throw new Error('Unexpected tree structure');
    }
    const styleArray = Array.isArray(tree.props.style) ? tree.props.style : [tree.props.style];
    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: customSize,
          height: customSize,
          borderColor: customColor,
        }),
      ]),
    );
  });

  test('runs indeterminate animation mode', () => {
    const { toJSON } = render(<Spinner animationType="indeterminate" />);
    const tree = toJSON();
    if (!tree || Array.isArray(tree) || !('props' in tree)) {
      throw new Error('Unexpected tree structure');
    }
    const styles = Array.isArray(tree.props.style) ? tree.props.style : [tree.props.style];
    const hasRotate = styles.some((style: any) => style.transform && style.transform[0].rotate);
    expect(hasRotate).toBe(true);
  });

  test('runs fixed animation mode', () => {
    const { toJSON } = render(<Spinner animationType="fixed" duration={2000} />);
    const tree = toJSON();
    if (!tree || Array.isArray(tree) || !('props' in tree)) {
      throw new Error('Unexpected tree structure');
    }
    const styles = Array.isArray(tree.props.style) ? tree.props.style : [tree.props.style];
    const hasRotate = styles.some((style: any) => style.transform && style.transform[0].rotate);
    expect(hasRotate).toBe(true);
  });
});
