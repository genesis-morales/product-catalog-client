import React, { createContext, useContext, useState } from 'react';

interface StoreContextType {
  search: string;
  setSearch: (value: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('');

  return (
    <StoreContext.Provider value={{ search, setSearch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStoreContext debe usarse dentro de StoreProvider');
  return ctx;
};