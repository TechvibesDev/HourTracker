import React from "react";
import * as Location from 'expo-location';
export default (callback: any, shouldTrack: any) => {
    const [err, setError] = React.useState<any>();
    const [subscriber, setSubscriber] = React.useState<any>(null);
    const startWatching = async () => {
        try {
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
        } catch (err) {
            setError(err);
        }
    };
    React.useEffect(() => {
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