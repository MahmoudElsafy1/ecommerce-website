import { createContext, useState } from "react";
import React from "react";
export const Menu = createContext("");

export default function MenuContext({ children }) {
  const [IsOpen, setIsOpen] = useState(true);
  return (
    <Menu.Provider value={{ IsOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}
