# Divider Component

A reusable React Native component for rendering horizontal or vertical dividers with support for thickness, length, dash styles, and design-token-based color theming.

## Props

| Prop         | Type                                                                 | Default             | Description                                                                 |
|--------------|----------------------------------------------------------------------|----------------------|-----------------------------------------------------------------------------|
| `orientation`| `'horizontal'` \| `'vertical'`                                       | `'horizontal'`       | Sets the divider's layout direction.                                        |
| `thickness`  | `number`                                                             | `1`                  | Specifies the thickness (height or width based on orientation).             |
| `length`     | `number` \| `string`                                                 | `'100%'`             | Length of the divider (e.g., `100`, `'50%'`).                               |
| `dashStyle`  | `'solid'` \| `'dashed'` \| `'dotted'`                                | `'solid'`            | Controls the dash style of the divider.                                     |
| `color`      | `'primary'` \| `'secondary'` \| `'tertiary'` \| `'danger'`<br>`\| 'warning'` \| `'success'` \| `'neutral'` | `'neutral'` | Must be a valid theme token. Internally uses the `.200` shade.             |
| `style`      | `StyleProp<ViewStyle>`                                               | `undefined`          | Custom additional styles for the divider.                                   |

## Behavior

- Automatically resolves the color using the `.200` shade of the given design token (e.g., `'primary.200'`).
- If an invalid color is passed, the component will fall back to using the input value directly.
- Maintains consistent styling across platforms using `StyleSheet.create`.

## Example

```tsx
import { Divider } from '@/components';

<Divider
  orientation="horizontal"
  thickness={2}
  length="50%"
  color="primary"
  dashStyle="dashed"
/>
