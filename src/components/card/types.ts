import type { ReactNode } from 'react';

/**
 * Defines different card sizes.
 */
export type CardSize = 'small' | 'medium' | 'large';

/**
 * Props for the Card component.
 */
export interface CardProps {
  size?: CardSize;
  elevated?: boolean;
  children?: ReactNode;
}

/**
 * Props for the CardHeader component.
 */
export interface CardHeaderProps {
  children?: ReactNode;
}

/**
 * Props for the CardTitle component.
 */
export interface CardTitleProps {
  children: ReactNode;
}

/**
 * Props for the CardDescription component.
 */
export interface CardDescriptionProps {
  children: ReactNode;
}

/**
 * Props for the CardContent component.
 */
export interface CardContentProps {
  children?: ReactNode;
}

/**
 * Props for the CardFooter component.
 */
export interface CardFooterProps {
  children?: ReactNode;
}
