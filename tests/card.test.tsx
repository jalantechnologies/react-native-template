import React from 'react';
import { render } from '@testing-library/react-native';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../src/components/card';
import { Text } from 'react-native';

// Ensure the Card component and its subcomponents render correctly
describe('Card Component', () => {
  test('renders correctly with children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>,
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  test('renders CardHeader with title and description', () => {
    const { getByText } = render(
      <CardHeader>
        <CardTitle>Test Title</CardTitle>
        <CardDescription>Test Description</CardDescription>
      </CardHeader>,
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  test('renders CardContent with text', () => {
    const { getByText } = render(
      <CardContent>
        <Text>Card Body</Text>
      </CardContent>,
    );
    expect(getByText('Card Body')).toBeTruthy();
  });

  test('renders CardFooter with buttons', () => {
    const { getByText } = render(
      <CardFooter>
        <Text>Save</Text>
        <Text>Cancel</Text>
      </CardFooter>,
    );
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });
});
