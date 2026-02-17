import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Snackbar } from 'react-native-paper';

interface ToastContextType {
  show: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  const onDismiss = () => setVisible(false);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={3000}
        action={{
          label: 'Close',
          onPress: onDismiss,
        }}
      >
        {message}
      </Snackbar>
    </ToastContext.Provider>
  );
};
