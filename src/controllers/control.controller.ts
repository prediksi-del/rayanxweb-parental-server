import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rtdb } from '../config/firebase';

export const sendInstantCommand = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { deviceId, action, mode, lens } = req.body; // action: "LOCK" | "UNLOCK" | "FLASH" | "CAPTURE_CAMERA"

  if (!rtdb) {
    res.status(500).json({ success: false, message: 'Layanan database tidak tersedia.' });
    return;
  }

  try {
    // Menulis instruksi langsung ke node target perangkat anak
    const commandRef = rtdb.ref(`devices/${deviceId}/commands`);
    await commandRef.set({
      command: action,
      mode: mode || null,   // Contoh: "ON", "OFF", "BLINK"
      lens: lens || null,   // Contoh: "DEPAN", "BELAKANG"
      timestamp: admin.database.ServerValue.TIMESTAMP
    });

    res.status(200).json({ success: true, message: `Instruksi ${action} berhasil dikirim ke Realtime Database.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memproses ke database.', error });
  }
};
