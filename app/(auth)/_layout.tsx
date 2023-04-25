import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{
                    presentation: 'fullScreenModal',
                    headerStyle: { backgroundColor: '#3B7A57' },
                    headerTitleStyle: { color: '#FFFF' },
                    headerTintColor:'#FFFFFF',
                    headerTitle:'Register'
                }} />
            </Stack>
        </>
    )
}