import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { auth } from '../constants/firebase';
import { TrackProvider } from '../context/trackContext/trackContext';
import { trackInitialState, trackReducer } from '../context/trackContext/track.reducer';
import { LocationProvider } from '../context/locationContext/locationContext';
import { locationInitialState, locationReducer } from '../context/locationContext/location.reducer';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: auth.currentUser ? "(tabs)" : '(auth)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
    <TrackProvider initialState={trackInitialState} reducer={trackReducer}>
    <LocationProvider
        initialState={locationInitialState}
        reducer={locationReducer}
      >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ActionSheetProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{
              title: 'Create Trip',
              animationTypeForReplace: 'pop',
              gestureEnabled: true,
              gestureDirection: 'vertical'
            }} />
            <Stack.Screen name="tracker" options={{
              title: 'Trip Tracker',
              animationTypeForReplace: 'pop',
              gestureEnabled: true,
              gestureDirection: 'vertical'
            }} />
          </Stack>
        </ActionSheetProvider>
      </ThemeProvider>
      </LocationProvider>
      </TrackProvider>
    </>
  );
}
