# Typography Component

The `Typography` component provides predefined text styles for headings, subheadings, and body text, ensuring consistent typography across the app.

## Features

- **Variants**: `'h1'`, `'h2'`, `'h3'`, `'body'`, `'caption'`
- **Global Theme**: Automatically inherits text color from the global theme.
- **Accessibility Support**: Supports font scaling based on user settings.

## Usage

### Basic Example

```tsx
import Typography from './Typography';

const App = () => (
  <>
    <Typography variant="h1">Welcome</Typography>
    <Typography variant="body">
      This is a sample application demonstrating the Typography component.
    </Typography>
  </>
);
```
