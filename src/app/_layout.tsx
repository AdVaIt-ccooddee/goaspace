
import {
  Stack,
  router,
  useRootNavigationState,
  useSegments
} from 'expo-router';

import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  View
} from 'react-native';

import {
  onAuthStateChanged,
  type User
} from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const segments = useSegments();
  const rootState = useRootNavigationState();

  // Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle navigation
  useEffect(() => {
    if (loading || !rootState?.key) return;

    const inLogin = segments[0] === 'login';

    if (!user && !inLogin) {
      router.replace('/login');
    } 
    else if (user && inLogin) {
      router.replace('/(tabs)');
    }

  }, [user, loading, segments, rootState?.key]);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6EF'
      }}>
        <ActivityIndicator
          size="large"
          color="#24543C"
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
