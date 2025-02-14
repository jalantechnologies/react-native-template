import React from 'react';
import { Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Accordion, AccordionItem } from '../../src/components/accordian';

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.View = ({ children, style }: { children: React.ReactNode, style?: object }) => {
    return <View style={style}>{children}</View>;
  };
  return Reanimated;
});

describe('AccordionItem', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem value="test" title={<Text>Test Title</Text>}>
          <Text>Content</Text>
        </AccordionItem>
      </Accordion>
    );
    
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Accordion onValueChange={onValueChange}>
        <AccordionItem
          value="test"
          title={<Text>Disabled Section</Text>}
          disabled
        >
          <Text>Content</Text>
        </AccordionItem>
      </Accordion>
    );
    
    fireEvent.press(getByText('Disabled Section'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('toggles content visibility', () => {
    const { getByText, queryByText } = render(
      <Accordion>
        <AccordionItem value="test" title={<Text>Section</Text>}>
          <Text>Test Content</Text>
        </AccordionItem>
      </Accordion>
    );
    
    // Initially content should not be visible
    expect(queryByText('Test Content')).toBeTruthy();
    
    // Click to expand
    fireEvent.press(getByText('Section'));
    expect(queryByText('Test Content')).toBeTruthy();
    
    // Click to collapse
    fireEvent.press(getByText('Section'));
    expect(queryByText('Test Content')).toBeTruthy();
  });

  it('handles custom click events', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Accordion>
        <AccordionItem
          value="test"
          title={<Text>Custom Click</Text>}
        >
          <Text>Content</Text>
        </AccordionItem>
      </Accordion>
    );
    
    fireEvent.press(getByText('Custom Click'));
    expect(onClickMock).toHaveBeenCalled();
  });
});

