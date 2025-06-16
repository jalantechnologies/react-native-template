export const ALLOWED_DIVIDER_COLORS = {
  primary: '200',
  secondary: '200',
  tertiary: '200',
  background: '200',
  danger: '200',
  warning: '200',
  success: '200',
} as const;

export type AllowedColor = keyof typeof ALLOWED_DIVIDER_COLORS;
export type AllowedShade = (typeof ALLOWED_DIVIDER_COLORS)[AllowedColor];
