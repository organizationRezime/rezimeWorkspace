import { createContext, useContext, useState } from 'react'

export const SidebarContext = createContext();

export const useSidebar = ()=> useContext(SidebarContext);

export const SidebarProvider = ({children})=> {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <SidebarContext.Provider value={{isCollapsed, setIsCollapsed}}>
        {children}
    </SidebarContext.Provider>
  );
}