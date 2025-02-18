# Toast Component

The `Toast` component is used for displaying temporary notifications. It can indicate success, errors, warnings, or information messages. 

## Features
- Supports `success`, `error`, `warning`, and `info` variants
- Can be dismissed manually or automatically after a specified duration
- Fully customizable via props
- Optimized for future **NativeWind** integration

##  Usage

```tsx
import Toast from '../src/components/toast';

<Toast
  isVisible={true}
  variant="success"
  message="Operation successful!"
  autoDismiss
  dismissAfter={3000}
  onDismiss={() => console.log('Toast dismissed')}
/>;
