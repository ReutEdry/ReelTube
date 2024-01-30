import { Stack } from 'expo-router';

export default function RootLayout() {
    return (<Stack screenOptions={{
        headerStyle: {
            // backgroundColor: '#fff',
            backgroundColor: 'rgb(129, 17, 18)',
        },
        // headerTintColor:  'rgb(129, 17, 18)',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
        <Stack.Screen name='index' options={{ title: 'ReelTube' }} />
    </Stack>
    )
}

