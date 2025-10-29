import { createContext, useState } from "react";

export const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [country, setCountry] = useState("all");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}
