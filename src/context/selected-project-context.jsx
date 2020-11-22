import React, { useContext, useState, createContext } from "react";

export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  // Default Project as INBOX
  const [selectedProject, setSelectedProject] = useState("INBOX");

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
