# MenuItem Component

A flexible menu item component for contextual menus and navigation.

## Features
- Icon support (left/right positions)
- Disabled state handling
- Custom styling
- Accessibility ready
- Type-safe props

## Usage
```tsx
import { MenuItem } from './components/menu';

// Basic usage
<MenuItem
  label="Settings"
  onPress={() => console.log('Settings pressed')}
  icon={<SettingsIcon />}
/>

// Disabled state
<MenuItem
  label="Disabled Item"
  disabled
  iconPosition="right"
  icon={<LockIcon />}
/>