export enum BadgeType {
    SOLID = 'solid',
    LIGHT = 'light',
    TEXT = 'text',
}

export enum BadgeColor {
    DARK = 'dark',
    ERROR = 'error',
    GRAY = 'gray',
    INFO = 'info',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
}

export enum BadgeSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface BadgeProps {
  label: number | string;
  type?: BadgeType;
  color?: BadgeColor;
  size?: BadgeSize;
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
}