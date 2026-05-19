import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Membaca string JSON rahasia dari Environment Variable Vercel
    const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (firebaseServiceAccount) {
      const serviceAccount = JSON.parse(firebaseServiceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK Production berhasil diinisialisasi.');
    } else {
      console.warn('Peringatan: FIREBASE_SERVICE_ACCOUNT tidak ditemukan di Environment Variables.');
    }
  } catch (error) {
    console.error('Gagal memuat kredensial Firebase di Production:', error);
  }
}

export const messaging = admin.apps.length ? admin.messaging() : null;
