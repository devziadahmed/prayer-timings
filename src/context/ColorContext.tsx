import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

function ColorProvider({ children }) {
  const [color, setColor] = useLocalStorage("color", "#2c5770");

  return <ColorContext.Provider value={{ color, setColor }}>{children}</ColorContext.Provider>;
}

export default ColorProvider;
