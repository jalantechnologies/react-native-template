import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DEFAULT_DISMISS_TIME } from './constants';
import type { ToastProps } from './types';

/**
 * Toast Component - Displays temporary notifications.
 *
 * Example usage:
 * ```tsx
 * <Toast
 *   isVisible={true}
 *   variant="success"
 *   message="Operation successful!"
 *   autoDismiss
 *   dismissAfter={3000}
 *   onDismiss={() => console.log('Toast dismissed')}
 * />
 * ```
 */
const Toast: React.FC<ToastProps> = ({
  isVisible,
  variant = 'info',
  message,
  autoDismiss = true,
  dismissAfter = DEFAULT_DISMISS_TIME,
  onDismiss,
  style, // Placeholder for future NativeWind integration
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && autoDismiss && onDismiss) {
      timer = setTimeout(() => {
        onDismiss();
      }, dismissAfter);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, autoDismiss, dismissAfter, onDismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.toastContainer, style]}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

// Placeholder styles (to be replaced by NativeWind later)
const styles = StyleSheet.create({
  toastContainer: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#333', // Default color (this will be replaced)
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Toast;
