# Modal Component

The `Modal` component provides a customizable overlay for displaying content, such as alerts, popups, and confirmation dialogs.

## Features

- **Visibility Control:** `isVisible` prop to show or hide the modal.
- **Close Action:** `onClose` prop to handle the close action.
- **Content Structure:** `header`, `body`, and `footer` slots for structured content.
- **Customizable Size:** `size` prop with options ('small', 'medium', 'large').
- **Animation:** `animationType` prop with options ('none', 'slide', 'fade').

## Usage

### Basic Example

```tsx
import Modal from './Modal';

const App = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <Button title="Show Modal" onPress={() => setIsVisible(true)} />
      <Modal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        header={<Text>Header</Text>}
        body={<Text>Body</Text>}
        footer={<Text>Footer</Text>}
      />
    </>
  );
};
```
