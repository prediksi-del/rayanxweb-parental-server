import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rtdb } from '../config/firebase';
import * as admin from 'firebase-admin';

export const exploreDirectory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { deviceId, targetPath } = req.query; 
  
  if (!deviceId) {
    res.status(400).json({ success: false, message: 'Parameter deviceId wajib disertakan.' });
    return;
  }

  if (!rtdb) {
    res.status(500).json({ success: false, message: 'Layanan Realtime Database tidak tersedia.' });
    return;
  }

  try {
    const commandRef = rtdb.ref(`devices/${deviceId}/commands`);
    
    await commandRef.set({
      command: "EXPLORE_DIR",
      path: (targetPath as string) || "/sdcard",
      timestamp: admin.database.ServerValue.TIMESTAMP
    });

    res.status(200).json({ 
      success: true, 
      message: 'Permintaan baca file manager berhasil dikirim ke Realtime Database.' 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengirimkan perintah file manager.', 
      error: error.message 
    });
  }
};
