import { useTheme as styledUseTheme } from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const useTheme = (): DefaultTheme => {
  return styledUseTheme();
};
