import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, Button } from 'react-native';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../src/components/card';

describe('Card Component', () => {
  test('renders Card with children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>,
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  test('renders CardHeader with children', () => {
    const { getByText } = render(
      <CardHeader>
        <Text>Card Header</Text>
      </CardHeader>,
    );
    expect(getByText('Card Header')).toBeTruthy();
  });

  test('renders CardTitle with text', () => {
    const { getByText } = render(<CardTitle>Test Title</CardTitle>);
    expect(getByText('Test Title')).toBeTruthy();
  });

  test('renders CardDescription with text', () => {
    const { getByText } = render(<CardDescription>Test Description</CardDescription>);
    expect(getByText('Test Description')).toBeTruthy();
  });

  test('renders CardContent with children', () => {
    const { getByText } = render(
      <CardContent>
        <Text>Card Main Content</Text>
      </CardContent>,
    );
    expect(getByText('Card Main Content')).toBeTruthy();
  });

  test('renders CardFooter with children', () => {
    const { getByText } = render(
      <CardFooter>
        <Button title="Save" onPress={() => {}} />
        <Button title="Cancel" onPress={() => {}} />
      </CardFooter>,
    );
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  test('Card component handles different sizes', () => {
    const { getByText } = render(
      <Card size="large">
        <Text>Large Card</Text>
      </Card>,
    );
    expect(getByText('Large Card')).toBeTruthy();
  });

  test('Card component handles elevation', () => {
    const { getByText } = render(
      <Card elevated>
        <Text>Elevated Card</Text>
      </Card>,
    );
    expect(getByText('Elevated Card')).toBeTruthy();
  });
});
