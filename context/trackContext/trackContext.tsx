import React, { useReducer, useContext } from "react";

export const TrackContext = React.createContext<any>({});

export const TrackProvider = ({ initialState, reducer, children }: any) => {
    return (
        <TrackContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrackStateValue = () => useContext(TrackContext);