// SCREEN 3: Home dashboard. Image / Video / Code generate + Tools.
// Kisi doosre brand ka naam ya logo nahi hai. Tools ke button abhi "jald aa raha hai" dikhate hain.
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../lib/session';

const IMAGES = [
  { t: 'Phool', c: '#f59e0b' }, { t: 'Neon', c: '#9333ea' }, { t: 'Concert', c: '#2563eb' },
  { t: 'Pahad', c: '#059669' }, { t: 'Sheher', c: '#e11d48' },
];
const VIDEOS = [
  { t: 'Dance', c: '#0ea5e9' }, { t: 'Gym', c: '#334155' }, { t: 'Raat', c: '#7c2d12' },
  { t: 'Robot', c: '#64748b' }, { t: 'Safar', c: '#0d9488' },
];
const TOOLS: { name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'Chat', icon: 'chatbubble-ellipses' },
  { name: 'Image', icon: 'image' },
  { name: 'Video', icon: 'videocam' },
  { name: 'Code', icon: 'code-slash' },
  { name: 'Editor', icon: 'create' },
  { name: 'Cleaner', icon: 'sparkles' },
  { name: 'Aur', icon: 'ellipsis-horizontal' },
];

export default function HomeScreen() {
  const router = useRouter();
  const soon = (n: string) => Alert.alert(n, 'Yeh tool jald aa raha hai.');

  const signOut = async () => {
    await logout();
    router.replace('/'); // wapas SCREEN 1
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.top}>
        <Text style={s.topTxt}>Master AI</Text>
        <Pressable onPress={signOut} hitSlop={12}><Ionicons name="log-out-outline" size={24} color="#fff" /></Pressable>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.pill, { backgroundColor: '#ffe27a', color: '#4a3600' }]}>Image generate</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
          {IMAGES.map((x) => (
            <Pressable key={x.t} style={[s.tile, { backgroundColor: x.c }]} onPress={() => soon('Image generate')}>
              <Text style={s.tileTxt}>{x.t}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[s.pill, { backgroundColor: '#00e5ff', color: '#0a2a8a' }]}>Video generate</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
          {VIDEOS.map((x) => (
            <Pressable key={x.t} style={[s.tile, { backgroundColor: x.c }]} onPress={() => soon('Video generate')}>
              <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" style={s.play} />
              <Text style={s.tileTxt}>{x.t}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[s.pill, { backgroundColor: '#fff', color: '#000', borderWidth: 1, borderColor: '#d8dce3' }]}>Code generate</Text>
        <View style={s.code}>
          <Text style={s.codeTxt}>{'function greet(name) {\n  return `Namaste, ${name}!`;\n}'}</Text>
        </View>

        <Text style={s.section}>Tools</Text>
        <View style={s.grid}>
          {TOOLS.map((t) => (
            <Pressable key={t.name} style={s.tool} onPress={() => soon(t.name)}>
              <Ionicons name={t.icon} size={26} color="#0b8bf5" />
              <Text style={s.toolTxt}>{t.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={s.nav}>
        {(['home', 'chatbubble-ellipses', 'image', 'play-circle'] as const).map((n, i) => (
          <Pressable key={n} style={s.navBtn} onPress={() => i && soon('Yeh tab')}>
            <Ionicons name={n} size={26} color={i === 0 ? '#0b8bf5' : '#667'} />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f5f9' },
  top: { backgroundColor: '#0b8bf5', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topTxt: { color: '#fff', fontSize: 26, fontWeight: '800' },
  body: { padding: 16, paddingBottom: 24 },
  pill: { textAlign: 'center', fontSize: 22, fontWeight: '800', paddingVertical: 6, borderRadius: 999, marginTop: 14, marginBottom: 10, overflow: 'hidden' },
  row: { gap: 10 },
  tile: { width: 112, height: 150, borderRadius: 12, padding: 8, justifyContent: 'flex-end' },
  tileTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },
  play: { position: 'absolute', top: 54, left: 36 },
  code: { backgroundColor: '#0b1730', borderRadius: 12, padding: 14 },
  codeTxt: { color: '#8be9a8', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
  section: { fontSize: 20, fontWeight: '800', marginTop: 20, marginBottom: 10, color: '#0e1726' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tool: { width: '22.5%', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#dfe4ec' },
  toolTxt: { fontSize: 12, fontWeight: '600', color: '#0e1726' },
  nav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#dfe4ec', paddingVertical: 8 },
  navBtn: { padding: 8 },
});
