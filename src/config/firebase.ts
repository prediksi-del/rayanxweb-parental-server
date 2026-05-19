import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

const serviceAccountPath = path.join(process.cwd(), 'firebase-sa.json');

if (!admin.apps.length && fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK berhasil diinisialisasi.');
} else if (!admin.apps.length) {
  console.warn('Peringatan: File firebase-sa.json tidak ditemukan. Fitur remote control FCM dinonaktifkan.');
}

export const messaging = admin.apps.length ? admin.messaging() : null;
