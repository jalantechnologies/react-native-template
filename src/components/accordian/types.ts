import type { ReactNode } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';

export type StateChangeType = 'expand';

export interface AccordionState {
  expanded: string[];
}

export interface AccordionProps {
  /** Children must be AccordionItem components */
  children: ReactNode;
  /** Allows only one panel to be expanded at a time */
  type?: 'single' | 'multiple';
  /** Enable/disable collapse functionality */
  collapsible?: boolean;
  /** Initially expanded item keys */
  defaultValue?: string | string[];
  /** Controlled expanded items */
  value?: string | string[];
  /** Change handler for controlled mode */
  onValueChange?: (value: string | string[]) => void;
  /** Override default state changes */
  stateReducer?: (
    type: StateChangeType,
    nextState: AccordionState,
    currentState: AccordionState,
  ) => AccordionState;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Future NativeWind className */
  className?: string;
}

export interface AccordionItemProps {
  /** Unique identifier for the item */
  value: string;
  /** Content to be displayed */
  children: ReactNode;
  /** Custom header content */
  title: ReactNode;
  /** Disable this specific item */
  disabled?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Future NativeWind className */
  className?: string;
}

export interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
  animationConfig: {
    duration: number;
    easing: (x: number) => number;
  };
}
