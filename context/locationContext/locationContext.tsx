import React, { useReducer, useContext } from "react";
const LocationContext = React.createContext<any>([]);

export const LocationProvider = ({ reducer, initialState, children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LocationContext.Provider value={[state, dispatch]} >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationStateValue = () => useContext(LocationContext);