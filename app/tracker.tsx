import { useNavigation, useLocalSearchParams } from "expo-router";
import React from "react";
import { useLocationStateValue } from "../context/locationContext/locationContext";
import { ADD_CURRENT_LOCATION, ADD_LOCATION, CHANGE_NAME, STOP_RECORDING } from "../context/locationContext/location.action";
import useLocation from "../hooks/useLocation";
import MyMap from "../components/Map";
import { Text, View } from "../components/Themed";
import TrackForm from "../components/TrackerForm";
import { StyleSheet } from "react-native";

export default function TrackerScreen() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { trip } = params;
    const [isFocused, setFocused] = React.useState(navigation.isFocused());
    const [state, dispatch] = useLocationStateValue();

    const callback = React.useCallback(
        (location: any) => {
            dispatch({ type: ADD_CURRENT_LOCATION, location: location });
            if (state?.recording) {
                dispatch({ type: ADD_LOCATION, location: location });
            }
        },
        [state?.recording]
    );
    const [err] = useLocation(callback, isFocused || state.recording);

    React.useEffect(() => {
        const didBlur = () => setFocused(false);
        const didFocus = () => setFocused(true);

        const blurSubscription = navigation.addListener("blur", didBlur);
        const focusSubscription = navigation.addListener("focus", didFocus);

        // return () => {
        //   blurSubscription ? blurSubscription.remove() : null;
        //   focusSubscription ? focusSubscription.remove() : null;
        // };
    }, []);
    React.useEffect(() => { 
        dispatch({ type: CHANGE_NAME, name: trip });
        dispatch({ type: STOP_RECORDING });
    }, [])
    return (
        <React.Fragment>
            <MyMap />
            {err ? <Text>Please enable location services</Text> : null}
            {/* <View style={styles.form}>
                <TrackForm />
            </View> */}
        </React.Fragment>
    )
}
export const CreateTrackScreenOptions = {
    headerTitle: "Create Track",
};

const styles = StyleSheet.create({
    form: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
})