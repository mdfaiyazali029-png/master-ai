import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Teeno screens ek hi Stack mein hain. Navigation har screen ke andar router.replace() se hota hai.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />   {/* 1. Account chuno */}
        <Stack.Screen name="welcome" /> {/* 2. Welcome / Permission */}
        <Stack.Screen name="home" />    {/* 3. Home */}
      </Stack>
    </>
  );
}

