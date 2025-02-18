export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback initials when no image is provided */
  initials?: string;
  /** Determines avatar size */
  size?: AvatarSize;
  /** Determines avatar shape (circle or square) */
  shape?: AvatarShape;
  /** Optional icon to display when no image is provided */
  fallbackIcon?: React.ReactNode;
}
