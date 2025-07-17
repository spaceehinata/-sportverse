import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MenuContextType {
  menuVisible: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(prev => !prev);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <MenuContext.Provider value={{ menuVisible, toggleMenu, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};