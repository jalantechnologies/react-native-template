# Avatar Component

Display user avatars with fallback options for images, initials, or custom icons.

## Features

- Multiple display modes: Image, Initials, or Icon
- Configurable sizes (small, medium, large)
- Circle or square shapes
- Image error handling
- Accessibility support

## Usage

```tsx
import { Avatar } from './components/avatar';

// Image avatar
<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />

// Initials fallback
<Avatar initials="JD" />

// Custom icon fallback
<Avatar fallbackIcon={<UserIcon />} />

// Different sizes
<Avatar size="large" />

// Square shape
<Avatar shape="square" />
```
