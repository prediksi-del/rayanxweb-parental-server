import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rtdb } from '../config/firebase';
import * as admin from 'firebase-admin';

export const sendInstantCommand = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { deviceId, action, mode, lens } = req.body; 

  if (!deviceId || !action) {
    res.status(400).json({ success: false, message: 'Parameter deviceId dan action wajib diisi.' });
    return;
  }

  if (!rtdb) {
    res.status(500).json({ success: false, message: 'Layanan Realtime Database tidak aktif.' });
    return;
  }

  try {
    const commandRef = rtdb.ref(`devices/${deviceId}/commands`);
    
    await commandRef.set({
      command: action,
      mode: mode || null,   
      lens: lens || null,   
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
