# Master AI: 3 screen ka flow (Account -> Permission -> Home)

## Flow kaise chalta hai
| Screen | File | Aage kaise jaata hai |
|---|---|---|
| 1. Gmail chuno | `app/index.tsx` | NEXT dabane par login save hota hai, phir `router.replace('/welcome')` |
| 2. Welcome + Notification | `app/welcome.tsx` | Allow ya Skip dono par `router.replace('/home')` |
| 3. Home | `app/home.tsx` | Upar logout button, `router.replace('/')` se wapas screen 1 |

App dobara kholne par `app/index.tsx` pehle saved login dekhta hai (`lib/session.ts`).
Login aur welcome ho chuka ho to seedha home khulta hai, warna jahan rukey the wahin se aage.

## Folder ka dhaancha
```
app/_layout.tsx
app/index.tsx
app/welcome.tsx
app/home.tsx
lib/session.ts
lib/google.ts
SETUP.md
```

## App chalane ka rasta (sirf phone se)
`.tsx` app seedha GitHub se nahi chalti. Use Expo se chalana padta hai.

1. Is repo ke page par **Code -> Codespaces -> Create codespace on main** dabao.
   Browser mein ek cloud computer khulega (free hours milte hain).
2. Neeche wale terminal mein ek-ek karke ye commands chalao:

```
npx create-expo-app@latest expo-app
rm -rf expo-app/app
cp -r app lib expo-app/
cd expo-app
npx expo install expo-notifications @react-native-async-storage/async-storage
npx expo start --tunnel
```

3. Phone mein **Expo Go** app install karo, terminal mein aaya QR code scan karo.
4. Pehli screen par Gmail chuno, NEXT dabao, phir Allow ya Skip dabao, aur Home khul jayega.

Agar code badalna ho to GitHub ki file badlo, phir Codespace mein `git pull` chalao
aur `app` aur `lib` dobara `expo-app` mein copy karo.

## Asli Google login (phone ke Gmail accounts)
Abhi `lib/google.ts` mein `DEMO_MODE = true` hai, jo 3 demo email dikhata hai.
Asli login ke liye:
1. Google Cloud Console mein project banao -> OAuth consent screen -> **Web** aur **Android** OAuth client banao.
   Android client ke liye app ka package name aur SHA-1 chahiye.
2. `npx expo install @react-native-google-signin/google-signin`
3. `lib/google.ts` mein `WEB_CLIENT_ID` daalo aur `DEMO_MODE = false` karo.
4. Ye library **Expo Go mein nahi chalti**. Development build chahiye: `npx expo run:android` ya `eas build`.

Google ka account chooser system ka apna popup hota hai. App phone ke Gmail ki list
khud padh kar apne design mein nahi dikha sakta.

## Notification permission
Android 13 aur usse upar notification permission ek hi baar poochhi jaati hai.
Mana karne par baad mein user ko phone ki Settings se hi chalu karna padta hai.
