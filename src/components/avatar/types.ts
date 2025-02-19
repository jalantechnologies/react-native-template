export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallbackIcon?: React.ReactNode;
  testID?: string;
}
