import * as Notifications from 'expo-notifications';
import { Platform,Alert } from 'react-native';

export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Error', 'No se pudieron obtener los permisos para recibir notificaciones.'); 
        return; 
    }
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token Expo', token);
    return token;
} catch (error) {
    console.error('Error al registrar el token de notificación:', error);
    Alert.alert('Error', 'No se pudo registrar el token de notificación.');
  }
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export async function saveTokenToFirebase(token) {
    try {
        await db.collection('expoPushTokens').doc(token).set({token,updateAt: firebase.firestore.FieldValue.serverTimestamp(),});
         
    console.log('Token guardado en Firebase'); 
    }
    catch (error) {
        console.error('Error al guardar el token en Firebase:', error);
        Alert.alert('Error', 'No se pudo guardar el token en Firebase.');
    }
}