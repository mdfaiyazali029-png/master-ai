// Phone mein chhoti si yaaddasht: kaun login hai, aur welcome screen ho chuki ya nahi.
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = { email: string; name?: string };

const KEY_USER = 'masterai_user';
const KEY_WELCOME = 'masterai_welcome_done';

export async function loadSession(): Promise<{ user: User | null; welcomeDone: boolean }> {
  try {
    const [u, w] = await Promise.all([
      AsyncStorage.getItem(KEY_USER),
      AsyncStorage.getItem(KEY_WELCOME),
    ]);
    return { user: u ? (JSON.parse(u) as User) : null, welcomeDone: w === '1' };
  } catch {
    return { user: null, welcomeDone: false };
  }
}

export async function saveUser(user: User) {
  try { await AsyncStorage.setItem(KEY_USER, JSON.stringify(user)); } catch {}
}

export async function markWelcomeDone() {
  try { await AsyncStorage.setItem(KEY_WELCOME, '1'); } catch {}
}

export async function logout() {
  try { await AsyncStorage.multiRemove([KEY_USER, KEY_WELCOME]); } catch {}
}
