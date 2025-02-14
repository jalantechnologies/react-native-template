import { createContext, useContext } from 'react';

import type { AccordionContextValue } from './types';

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionContext must be used within an Accordion component');
  }
  return context;
};

export default AccordionContext;
