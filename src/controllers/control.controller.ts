import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rtdb } from '../config/firebase';
import * as admin from 'firebase-admin';

export const sendInstantCommand = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { deviceId, action, mode, lens } = req.body; 
  // action: "LOCK" | "UNLOCK" | "FLASH" | "CAPTURE_CAMERA"

  if (!deviceId || !action) {
    res.status(400).json({ success: false, message: 'Parameter deviceId dan action wajib diisi.' });
    return;
  }

  if (!rtdb) {
    res.status(500).json({ success: false, message: 'Layanan Realtime Database tidak aktif.' });
    return;
  }

  try {
    // Jalur node tujuan: devices/$device_id/commands
    const commandRef = rtdb.ref(`devices/${deviceId}/commands`);
    
    await commandRef.set({
      command: action,
      mode: mode || null,   // "ON", "OFF", "BLINK" (Untuk Flashlight)
      lens: lens || null,   // "FRONT", "BACK" (Untuk Camera Capture)
      timestamp: admin.database.ServerValue.TIMESTAMP
    });

    res.status(200).json({ 
      success: true, 
      message: `Instruksi ${action} berhasil diterbitkan ke Realtime Database.` 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal memproses instruksi ke Firebase.', 
      error: error.message 
    });
  }
};
