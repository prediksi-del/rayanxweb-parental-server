import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { sendFcmCommand } from './control.controller'; // Memanfaatkan fungsi helper fcm sebelumnya

export const exploreDirectory = async (req: AuthenticatedRequest, res: Response) => {
  const { deviceId, targetPath } = req.query; // targetPath contohnya: "/sdcard"
  
  // Meminta hp anak mengunggah daftar struktur folder mereka yang aktif ke server
  const success = await sendFcmCommand(deviceId as string, { 
    command: "EXPLORE_DIR", 
    path: (targetPath as string) || "/sdcard" 
  });

  res.json({ success, message: success ? 'Permintaan baca file manager dikirim.' : 'Hp anak tidak merespon.' });
};
