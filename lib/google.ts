// Google Sign-In.
// DEMO_MODE = true  -> Expo Go mein chalta hai, 3 demo Gmail dikhte hain (asli login nahi).
// DEMO_MODE = false -> asli Google account chooser (phone ke Gmail accounts) khulta hai.
//                      Iske liye SETUP.md ka "Asli Google login" hissa poora karna hoga.
import type { User } from './session';

export const DEMO_MODE = true;

// Google Cloud Console se mila "Web client ID" yahan daalo.
export const WEB_CLIENT_ID = 'YAHAN_APNA_WEB_CLIENT_ID.apps.googleusercontent.com';

export const DEMO_ACCOUNTS: User[] = [
  { email: 'faiyazalikhan29@gmail.com' },
  { email: 'faiyazali6699@gmail.com' },
  { email: 'faiyazalikhan30@gmail.com' },
];

export async function googleSignIn(): Promise<User> {
  // require() andar hi hai, taaki DEMO_MODE mein Expo Go is library ke bina bhi chale.
  const { GoogleSignin } = require('@react-native-google-signin/google-signin');
  GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
  await GoogleSignin.hasPlayServices();
  try { await GoogleSignin.signOut(); } catch {} // har baar account chooser dikhe
  const res = await GoogleSignin.signIn();
  const u = res?.data?.user ?? res?.user;
  if (!u?.email) throw new Error('Google se email nahi mila');
  return { email: u.email, name: u.name ?? undefined };
}
