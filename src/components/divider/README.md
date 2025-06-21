# Divider Component

A customizable and theme-consistent `Divider` component for React Native apps, used to separate content visually with support for orientation, thickness, length, and dash styles. 

## ✨ Features

- **Fixed Theme Colors**: Divider uses app-defined theme colors only (not user-provided).
- **Orientation Support**: Horizontal and Vertical dividers.
- **Dash Styles**: Supports `solid`, `dashed`, and `dotted` styles.
- **Custom Thickness and Length**: Flexible styling while enforcing brand consistency.

## 🔧 Props

| Prop         | Type                                | Default                         | Description                                      |
|--------------|-------------------------------------|----------------------------------|--------------------------------------------------|
| `orientation`| `horizontal` \| `vertical`          | `horizontal`                     | Divider layout direction                         |
| `thickness`  | `number`                            | `1`                              | Line thickness                                   |
| `length`     | `number` \| `string`                | `'100%'`                         | Length of the divider (px or percentage)         |
| `dashStyle`  | `solid` \| `dashed` \| `dotted`     | `solid`                          | Border style                                     |
| `style`      | `StyleProp<ViewStyle>`              | `undefined`                      | Additional custom styles (excluding color)       |

## 🎨 Theming

Divider color is derived from the app's theme using `ALLOWED_DIVIDER_COLORS` and `useThemeColor`. Consumers cannot override the color directly.

```ts
// Example internally used:
const color: AllowedColor = 'primary';
const shade: AllowedShade = ALLOWED_DIVIDER_COLORS[color];
const dividerColor = useThemeColor(`${color}.${shade}`);
