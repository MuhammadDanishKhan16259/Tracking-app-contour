import { createContext, useReducer, useState } from "react";
import { GlobalData, Reducer } from "./Reducer.mjs";

export const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [state, dispatch] = useReducer(Reducer, GlobalData);

  return (
    <GlobalContext.Provider
      value={{ authUser, setAuthUser, allWorkouts, setAllWorkouts }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
