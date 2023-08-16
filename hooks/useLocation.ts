import React from "react";
import * as Location from 'expo-location';
export default (callback: any, shouldTrack: any) => {
    const [err, setError] = React.useState<any>();
    const [subscriber, setSubscriber] = React.useState<any>(null);
    const startWatching = async () => {
        try {
            const { status } = await Location.requestBackgroundPermissionsAsync();
            if (status === 'granted') {
                await Location.getCurrentPositionAsync();
                const subscribe = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 2000,
                        distanceInterval: 10,
                    },
                    callback
                );
                setSubscriber(subscribe);
            }else{
                console.log("Test",status)
            }
        } catch (err) {
            setError(err);
        }
    };
    React.useEffect(() => {

        console.log('callback', JSON.stringify(callback));
        if (shouldTrack) {
            startWatching();
        } else {
            subscriber.remove();
        }
        subscriber ? subscriber.remove() : null;
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [err];
}