import { Stack } from "expo-router";


export function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'ReelTube' }} />
        </Stack>
    )
}