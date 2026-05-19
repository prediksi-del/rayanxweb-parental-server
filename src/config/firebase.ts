import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (firebaseServiceAccount) {
      const serviceAccount = JSON.parse(firebaseServiceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // WAJIB: Masukkan URL Realtime Database Anda di bawah ini
        databaseURL: "https://steadfast-tesla-402305/database/steadfast-tesla-402305-default-rtdb"
      });
      console.log('Firebase Admin SDK Production & RTDB berhasil terhubung.');
    } else {
      console.warn('FIREBASE_SERVICE_ACCOUNT tidak ditemukan.');
    }
  } catch (error) {
    console.error('Gagal memuat kredensial Firebase:', error);
  }
}

export const rtdb = admin.apps.length ? admin.database() : null;
