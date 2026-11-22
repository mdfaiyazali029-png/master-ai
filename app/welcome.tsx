// SCREEN 2: Welcome + Notification permission.
// "Allow" -> phone ka asli permission popup. "Skip" -> bina poochhe aage.
// Dono mein aage ka rasta ek hi hai: home.
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { markWelcomeDone } from '../lib/session';

export default function WelcomeScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied'>('idle');

  const goHome = async () => {
    await markWelcomeDone();
    router.replace('/home'); // -> SCREEN 3
  };

  const allow = async () => {
    try {
      const res = await Notifications.requestPermissionsAsync();
      setStatus(res.granted ? 'granted' : 'denied');
    } catch {
      setStatus('denied'); // permission na mile tab bhi app aage chalega
    }
    setTimeout(goHome, 700);
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <View style={s.bell}><Ionicons name="notifications" size={64} color="#fff" /></View>
        <Text style={s.title}>Welcome to Master AI</Text>
        <Text style={s.sub}>
          Image, video aur code banane ke saare AI tools ek jagah. Limit reset hote hi hum aapko bata denge.
        </Text>
      </View>

      <View style={s.sheet}>
        <Text style={s.h}>Permission this app</Text>
        <Pressable
          style={[s.perm, status === 'granted' && s.ok, status === 'denied' && s.no]}
          onPress={allow}
          disabled={status !== 'idle'}
        >
          <Ionicons name="notifications-outline" size={26} color="#00a5c0" />
          <Text style={s.permTxt}>Notification</Text>
          <Text style={s.state}>{status === 'granted' ? 'Allowed' : status === 'denied' ? 'Skipped' : 'Allow'}</Text>
        </Pressable>
        <Pressable style={s.cont} onPress={goHome}><Text style={s.contTxt}>CONTINUE</Text></Pressable>
        <Pressable onPress={goHome}><Text style={s.skip}>Skip</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#a9adb4' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 14 },
  bell: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#0b8bf5', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#0e1726', textAlign: 'center' },
  sub: { fontSize: 15, color: '#2b3340', textAlign: 'center' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 12 },
  h: { fontSize: 22, fontWeight: '800', color: '#0a3d9e', textAlign: 'center' },
  perm: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#d9dce1', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 20 },
  ok: { backgroundColor: '#c9f5d8' },
  no: { backgroundColor: '#fcd5d5' },
  permTxt: { flex: 1, fontSize: 18, color: '#0e1726' },
  state: { fontSize: 13, color: '#445', fontWeight: '600' },
  cont: { alignSelf: 'center', backgroundColor: '#0b8bf5', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 54, marginTop: 4 },
  contTxt: { color: '#fff', fontSize: 20, fontWeight: '800', fontStyle: 'italic' },
  skip: { textAlign: 'center', color: '#0a3d9e', fontWeight: '600', padding: 6 },
});
