import { render } from '@testing-library/react-native';
import React from 'react';

import { Skeleton } from '../src/components/skeleton';
import {
  DEFAULT_SKELETON_WIDTH,
  DEFAULT_SKELETON_HEIGHT,
} from '../src/components/skeleton/constants';

describe('Skeleton Component', () => {
  test('renders correctly with default props', () => {
    const { toJSON } = render(<Skeleton isVisible={true} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('renders as a rectangle by default', () => {
    const { toJSON } = render(<Skeleton isVisible={true} />);
    const tree = toJSON();
    // For a rectangle, the container style should have:
    // width: DEFAULT_SKELETON_WIDTH,
    // height: DEFAULT_SKELETON_HEIGHT,
    // borderRadius: 4 (as defined in our component for non-circular shapes)
    const styleArray =
      tree && Array.isArray(tree)
        ? tree.flatMap(node =>
            Array.isArray(node.props.style) ? node.props.style : [node.props.style],
          )
        : tree && Array.isArray(tree.props.style)
        ? tree.props.style
        : tree
        ? [tree.props.style]
        : [];
    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: DEFAULT_SKELETON_WIDTH,
          height: DEFAULT_SKELETON_HEIGHT,
          borderRadius: 4,
        }),
      ]),
    );
  });

  test('renders as a circle when shape is "circle"', () => {
    const customWidth = 50;
    const { toJSON } = render(<Skeleton isVisible={true} shape="circle" width={customWidth} />);
    const tree = toJSON();
    // For a circle, height should equal width and borderRadius should be half of width.
    const styleArray =
      tree && Array.isArray(tree)
        ? tree.flatMap(node =>
            Array.isArray(node.props.style) ? node.props.style : [node.props.style],
          )
        : tree && Array.isArray(tree.props.style)
        ? tree.props.style
        : tree
        ? [tree.props.style]
        : [];
    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: customWidth,
          height: customWidth,
          borderRadius: customWidth / 2,
        }),
      ]),
    );
  });

  test('applies shimmering animation when enabled', () => {
    const { toJSON } = render(<Skeleton isVisible={true} animation />);
    const tree = toJSON();
    // Check if one of the style objects includes an "opacity" property.
    const styleArray =
      tree && !Array.isArray(tree) && tree.props && Array.isArray(tree.props.style)
        ? tree.props.style
        : tree && !Array.isArray(tree) && tree.props
        ? [tree.props.style]
        : [];
    const hasOpacity: boolean = styleArray.some(
      (style: { opacity?: number }) => style.opacity !== undefined,
    );
    expect(hasOpacity).toBe(true);
  });
});
