# Divider Component

A customizable and theme-consistent `Divider` component for React Native apps, used to separate content visually with support for orientation, thickness, length, and dash styles.

## ✨ Features

- **Fixed Theme Colors**: Divider uses app-defined theme colors only (not user-provided).
- **Orientation Support**: Horizontal and Vertical dividers.
- **Dash Styles**: Supports `solid`, `dashed`, and `dotted` styles.
- **Custom Thickness and Length**: Flexible styling while enforcing brand consistency.

## 🔧 Props

| Prop         | Type                               | Default                         | Description                                      |
|--------------|------------------------------------|----------------------------------|--------------------------------------------------|
| `orientation`| `horizontal` \| `vertical`         | `horizontal`                     | Divider layout direction                         |
| `thickness`  | `number`                           | `1`                              | Line thickness                                   |
| `testID`     | `string`                           | `divider`                        | Custom test identifier                           |

## 🎨 Theming

Divider color is derived from the app's theme. Consumers cannot override the color directly. The divider will use the theme's default color for consistency across your app.
