# Combobox Component

A customizable autocomplete input with async support and multi-select capabilities.

## Features
- Virtualized list for performance
- Async options loading
- Multi-select support
- Debounced search
- Type-safe implementation

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ComboboxOption[]` | `[]` | Static options list |
| `value` | `ComboboxOption[]` | `[]` | Controlled selected values |
| `onChange` | `(options: ComboboxOption[]) => void` | - | Selection change handler |
| `async` | `boolean` | `false` | Enable async mode |
| `multiselect` | `boolean` | `false` | Allow multiple selections |
| `debounceMs` | `number` | `300` | Debounce timeout for async search |
| `loadOptions` | `(query: string) => Promise<ComboboxOption[]>` | - | Async options loader |

## Basic Usage

```tsx
import { Combobox } from './components/Combobox';

const App = () => (
  <Combobox
    options={[
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ]}
    onChange={(selected) => console.log(selected)}
    placeholder="Choose option"
  />
);

## Async search

```tsx
<Combobox
  async
  loadOptions={async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  }}
  debounceMs={500}
/>
```
## Multi select

```tsx
 <Combobox
  multiselect
  options={mockOptions}
  onChange={(selected) => updateState(selected)}
/>
```
