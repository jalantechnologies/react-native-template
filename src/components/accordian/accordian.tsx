import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import AccordionContext from './accordiancontext';
import { STATE_CHANGE_TYPE, ANIMATION_CONFIG } from './constants';
import { styles } from './styles';
import type { AccordionProps, AccordionState } from './types';

const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  stateReducer,
  style,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const isControlled = value !== undefined;

  const toggleItem = useCallback(
    (itemValue: string) => {
      const handleChange = (newState: AccordionState) => {
        if (!isControlled) {
          setExpandedItems(newState.expanded);
        }
        onValueChange?.(type === 'single' ? newState.expanded[0] : newState.expanded);
      };

      const currentState = { expanded: expandedItems };
      let nextState: AccordionState;

      if (type === 'single') {
        nextState = {
          expanded: expandedItems[0] === itemValue && collapsible ? [] : [itemValue],
        };
      } else {
        const index = expandedItems.indexOf(itemValue);
        const newExpanded = [...expandedItems];
        if (index >= 0) {
          newExpanded.splice(index, 1);
        } else {
          newExpanded.push(itemValue);
        }
        nextState = { expanded: newExpanded };
      }

      const finalState = stateReducer
        ? stateReducer(STATE_CHANGE_TYPE.expand, nextState, currentState)
        : nextState;

      handleChange(finalState);
    },
    [expandedItems, type, collapsible, isControlled, onValueChange, stateReducer],
  );

  const contextValue = useMemo(
    () => ({
      expandedItems,
      toggleItem,
      type,
      animationConfig: ANIMATION_CONFIG,
    }),
    [expandedItems, toggleItem, type],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </AccordionContext.Provider>
  );
};

export default Accordion;
