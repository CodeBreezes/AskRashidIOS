
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    iosClientId: '829615278581-9t3bh2bv49sup120v2aqnmq85vga6fgk.apps.googleusercontent.com',
    webClientId: '829615278581-9r4k6eiobocpi93cjr4qrd2jegk034q7.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true
  });
};

export const handleGoogleLogin = async () => {

  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  try {
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
  } catch (e) { }

  const signInResult = await GoogleSignin.signIn();

  if (!signInResult || !signInResult.data) {
    return null;
  }

  const idToken = signInResult.data.idToken;
  const user = signInResult.data.user;

  if (!idToken) {
    return null;
  } 

  const googleCredential = GoogleAuthProvider.credential(idToken);

  await signInWithCredential(getAuth(), googleCredential);

  await AsyncStorage.setItem('googlePhoto', user?.photo || '');

  await AsyncStorage.setItem('googleUser', JSON.stringify(user));

  return user;
};