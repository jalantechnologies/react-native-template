import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Accordion, AccordionItem } from '../../src/components/accordian';

describe('Accordion', () => {
  const TestAccordion = () => (
    <Accordion type="single">
      <AccordionItem value="1" title={<Text>Section 1</Text>}>
        <Text>Content 1</Text>
      </AccordionItem>
      <AccordionItem value="2" title={<Text>Section 2</Text>}>
        <Text>Content 2</Text>
      </AccordionItem>
    </Accordion>
  );

  it('renders all sections', () => {
    const { getByText } = render(<TestAccordion />);
    expect(getByText('Section 1')).toBeTruthy();
    expect(getByText('Section 2')).toBeTruthy();
  });

  it('expands section when clicked', () => {
    const { getByText, queryByText } = render(<TestAccordion />);
    
    // Initially content should not be visible
    expect(queryByText('Content 1')).toBeTruthy();
    
    // Click to expand
    fireEvent.press(getByText('Section 1'));
    expect(queryByText('Content 1')).toBeTruthy();
  });

  it('collapses previously expanded section in single mode', () => {
    const { getByText, queryByText } = render(<TestAccordion />);
    
    // Expand first section
    fireEvent.press(getByText('Section 1'));
    expect(queryByText('Content 1')).toBeTruthy();
    
    // Expand second section
    fireEvent.press(getByText('Section 2'));
    // First section should collapse
    expect(queryByText('Content 1')).not.toBeTruthy();
    expect(queryByText('Content 2')).toBeTruthy();
  });

  it('allows multiple sections in multiple mode', () => {
    const { getByText, queryByText } = render(
      <Accordion type="multiple">
        <AccordionItem value="1" title={<Text>Section 1</Text>}>
          <Text>Content 1</Text>
        </AccordionItem>
        <AccordionItem value="2" title={<Text>Section 2</Text>}>
          <Text>Content 2</Text>
        </AccordionItem>
      </Accordion>
    );
    
    fireEvent.press(getByText('Section 1'));
    fireEvent.press(getByText('Section 2'));
    
    expect(queryByText('Content 1')).toBeTruthy();
    expect(queryByText('Content 2')).toBeTruthy();
  });

  it('handles controlled mode correctly', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Accordion 
        type="single"
        value={['1']} 
        onValueChange={onValueChange}
      >
        <AccordionItem value="1" title={<Text>Section 1</Text>}>
          <Text>Content 1</Text>
        </AccordionItem>
      </Accordion>
    );
    
    fireEvent.press(getByText('Section 1'));
    expect(onValueChange).toHaveBeenCalledWith([]);
  });
});
