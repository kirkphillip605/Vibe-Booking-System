import React, { createContext, useContext, useState } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProviderProps {
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  const value: RouterContextType = {
    currentPath,
    navigate,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useLocation must be used within a RouterProvider');
  }
  return context;
};
