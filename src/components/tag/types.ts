import React from 'react';

import { TAG_VARIANTS, TAG_SHAPES } from './constants';

export type TagVariant = keyof typeof TAG_VARIANTS;
export type TagShape = keyof typeof TAG_SHAPES;

export interface TagProps {
  variant?: TagVariant; // Determines the visual variant (color) of the tag.
  shape?: TagShape; // Determines if the tag is pill-shaped or square.
  onRemove?: () => void; // Callback function for when the tag is removed.
  children: React.ReactNode; // The content (label) of the tag.
}
