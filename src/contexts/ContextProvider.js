import React, { useState } from "react";
import Context from "./context";
import { useNavigation } from "@react-navigation/native";

const ContextProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

export default ContextProvider;
