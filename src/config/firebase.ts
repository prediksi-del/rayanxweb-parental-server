import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    const databaseURL = process.env.FIREBASE_DATABASE_URL;

    if (firebaseServiceAccount) {
      const cleanJsonString = firebaseServiceAccount.trim();
      const serviceAccount = JSON.parse(cleanJsonString);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseURL || "https://steadfast-tesla-402305-default-rtdb.asia-southeast1.firebasedatabase.app"
      });
      console.log('Firebase Admin SDK & Realtime Database sukses diinisialisasi.');
    } else {
      console.warn('Peringatan: FIREBASE_SERVICE_ACCOUNT tidak ditemukan di Environment Variables.');
    }
  } catch (error) {
    console.error('Gagal memuat kredensial Firebase Admin SDK:', error);
  }
}

export const rtdb = admin.apps.length ? admin.database() : null;
export const messaging = admin.apps.length ? admin.messaging() : null;
export default admin;
