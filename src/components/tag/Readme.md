# Tag Component Documentation

## Overview

The `Tag` component is a reusable UI element designed to display label-like elements, such as categories, statuses, or keywords. It is built to be modular and customizable, allowing developers to easily add or remove tags as needed. This component is implemented with a focus on functionality and a clear API, while styling will be integrated later with NativeWind.

## Features

- **Customizable Appearance:** Supports different visual variants and shapes.
- **Dynamic Removal:** Optionally includes a close button that triggers an `onRemove` callback.
- **Modular Design:** Can be used independently or as part of a tag group.
- **Future-Proof:** Logic and API are defined now; styling will be enhanced via NativeWind in future updates.


## Props
- **variant** (`TagVariant`): Defines the visual style of the tag (e.g., `primary`, `secondary`, `info`, `warning`, `error`). Default is `primary`.
- **shape** (`TagShape`): Determines the shape of the tag, such as `pill` or `square`. Default is `pill`.
- **onRemove** (`() => void`): Optional callback function that is triggered when the tag's remove (close) button is pressed.
- **children** (`React.ReactNode`): The label or content displayed inside the tag.

## Usage Example
```tsx
import React from 'react';
import { Tag } from '@/components/tags';

const Example = () => {
  const handleRemove = () => {
    console.log('Tag removed');
  };

  return (
    <Tag variant="primary" shape="pill" onRemove={handleRemove}>
      Example Tag
    </Tag>
  );
};

export default Example;
