// SCREEN 1: Gmail account chuno.
// App khulte hi pehle saved login check hota hai:
//   login + welcome ho chuka -> seedha home
//   login hai, welcome baaki  -> welcome
//   login nahi                -> yahi screen
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loadSession, saveUser, type User } from '../lib/session';
import { DEMO_ACCOUNTS, DEMO_MODE, googleSignIn } from '../lib/google';

export default function AccountScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [picked, setPicked] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await loadSession();
      if (s.user && s.welcomeDone) router.replace('/home');
      else if (s.user) router.replace('/welcome');
      else setChecking(false);
    })();
  }, []);

  const next = async () => {
    try {
      setBusy(true);
      let user = picked;
      if (!DEMO_MODE) user = await googleSignIn(); // asli Google chooser
      if (!user) { Alert.alert('Pehle ek Gmail chuno'); return; }
      await saveUser(user);
      router.replace('/welcome'); // -> SCREEN 2
    } catch (e: any) {
      Alert.alert('Login nahi hua', e?.message ?? 'Dobara koshish karo');
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return <View style={[s.root, s.center]}><ActivityIndicator size="large" color="#0b8bf5" /></View>;
  }

  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <View style={s.logo}>
          <MaterialCommunityIcons name="head-cog" size={92} color="#fff" />
        </View>
        <Text style={s.title}>Master AI</Text>
      </View>

      <View style={s.bottom}>
        {DEMO_MODE ? (
          <>
            {DEMO_ACCOUNTS.map((a) => {
              const on = picked?.email === a.email;
              return (
                <Pressable key={a.email} onPress={() => setPicked(a)} style={[s.acct, on && s.acctOn]}>
                  <View style={s.dot}><Text style={s.dotTxt}>{a.email[0].toUpperCase()}</Text></View>
                  <Text style={s.email} numberOfLines={1}>{a.email}</Text>
                </Pressable>
              );
            })}
            <Text style={s.note}>Demo accounts. Asli login ke liye lib/google.ts mein DEMO_MODE = false karo.</Text>
          </>
        ) : (
          <Text style={s.note}>NEXT dabane par aapke phone ke Google accounts dikhenge.</Text>
        )}
        <Pressable style={[s.next, busy && { opacity: 0.6 }]} onPress={next} disabled={busy}>
          <Text style={s.nextTxt}>{busy ? '...' : 'NEXT'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18 },
  logo: { width: 170, height: 170, borderRadius: 85, backgroundColor: '#0b8bf5', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: '800', color: '#000' },
  bottom: { paddingHorizontal: 28, paddingBottom: 28, gap: 10, alignItems: 'center' },
  acct: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', backgroundColor: '#e3e5e8', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14, borderWidth: 2, borderColor: 'transparent' },
  acctOn: { borderColor: '#0b8bf5', backgroundColor: '#dcecff' },
  dot: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1b84ff', alignItems: 'center', justifyContent: 'center' },
  dotTxt: { color: '#fff', fontWeight: '700' },
  email: { flex: 1, fontSize: 16, color: '#222' },
  note: { fontSize: 12, color: '#667', textAlign: 'center' },
  next: { marginTop: 6, backgroundColor: '#0b8bf5', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 64 },
  nextTxt: { color: '#fff', fontSize: 22, fontWeight: '800', fontStyle: 'italic' },
});
