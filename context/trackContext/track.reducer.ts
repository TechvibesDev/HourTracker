import { FETCH_TRACK } from "./track.action";

export const trackInitialState = {
    allTracks: [],
};
const initialState: any = [] || {};
export function trackReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_TRACK:
            return {
                ...state,
                allTracks: action.tracks,
            };
    }
    return state;
}