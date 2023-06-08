import { RESET } from "../locationContext/location.action";

export const FETCH_TRACK = "FETCH_TRACK";

export const createTrack = async (locationDispatch: any, name: string, locations: any) => {
    //   await axios.post("/tracks", { name, locations });
    locationDispatch({ type: RESET });
};

export const getTracks = async (dispatch: any) => {
    //   const response = await axios.get("/tracks");
    dispatch({ type: FETCH_TRACK, tracks: [] });
};