# Skeleton Component Documentation

## Overview

The `Skeleton` component displays a placeholder UI to indicate content loading. It is designed to be modular and reusable, providing a basic shimmering animation effect. This component is implemented with logic and API first, while styling will be enhanced later with NativeWind integration.

## Features

- **Configurable Shapes:**
  - `rect`: Renders as a rectangle with customizable width and height.
  - `circle`: Renders as a circle, where the height equals the width and the border-radius is half the width.
- **Shimmering Animation:**
  - Uses React Native's Animated API to create a simple fade in/out effect.
- **Visibility Control:**
  - The `isVisible` prop controls whether the component is rendered.
- **Customization:**
  - Accepts a `style` prop for additional custom styling, which will later be replaced by NativeWind classes.

## Props

| Prop        | Type                 | Default  | Description                                                        |
| ----------- | -------------------- | -------- | ------------------------------------------------------------------ |
| `isVisible` | `boolean`            | `true`   | Controls whether the Skeleton is rendered.                         |
| `shape`     | `'rect' \| 'circle'` | `'rect'` | Determines the shape of the skeleton.                              |
| `width`     | `number`             | `100`    | The width of the skeleton (in pixels).                             |
| `height`    | `number`             | `20`     | The height of the skeleton (in pixels; ignored for circle shape).  |
| `animation` | `boolean`            | `true`   | Enables the shimmering animation effect.                           |
| `style`     | `object`             | `{}`     | Additional custom styles (to be integrated with NativeWind later). |

## Usage Example

```tsx
import React from 'react';
import { Skeleton } from '@/components/skeleton';

const Example = () => (
  <>
    {/* Rectangle Skeleton */}
    <Skeleton isVisible shape="rect" width={200} height={20} animation />

    {/* Circular Skeleton */}
    <Skeleton isVisible shape="circle" width={50} animation />
  </>
);

export default Example;
```
