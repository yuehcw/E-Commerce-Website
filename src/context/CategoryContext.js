import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <CategoryContext.Provider value={[activeCategory, setActiveCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};
