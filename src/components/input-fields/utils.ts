import type { InputSize, InputVariant } from './types';

/**
 * Maps input size to appropriate styles (to be used later when integrating NativeWind).
 */
export const getInputSizeStyle = (size: InputSize) => {
  switch (size) {
    case 'small':
      return { height: 32, fontSize: 14, paddingHorizontal: 8 };
    case 'medium':
      return { height: 40, fontSize: 16, paddingHorizontal: 10 };
    case 'large':
      return { height: 48, fontSize: 18, paddingHorizontal: 12 };
    default:
      return {};
  }
};

/**
 * Maps input variant to appropriate styles (to be used later when integrating NativeWind).
 */
export const getInputVariantStyle = (variant: InputVariant) => {
  switch (variant) {
    case 'filled':
      return { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ccc' };
    case 'outlined':
      return { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333' };
    case 'standard':
      return { backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: '#333' };
    default:
      return {};
  }
};
