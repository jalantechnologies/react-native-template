import React, { PropsWithChildren, createContext, useMemo } from 'react';
import { CatService } from '../services';

export interface CatContextInterface {
  getCatFacts: () => Promise<any>;
}

export const CatContext = createContext<CatContextInterface>(undefined);

export const CatContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const catService = useMemo(() => new CatService(), []);

  const getCatFacts = async () => {
    const { data } = await catService.getCatFacts();
    return data;
  };

  return (
    <CatContext.Provider value={{ getCatFacts }}>
      {children}
    </CatContext.Provider>
  );
};
