import { ViewStyle } from 'react-native';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  isVisible: boolean; 
  variant?: ToastVariant; 
  message: string; 
  autoDismiss?: boolean; 
  dismissAfter?: number; 
  onDismiss?: () => void; 
  style?: ViewStyle; 
}
