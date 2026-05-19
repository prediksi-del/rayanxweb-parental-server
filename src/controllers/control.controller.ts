import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { ChildDevice } from '../models/ChildDevice';
import { messaging } from '../config/firebase';

// Fungsi utilitas untuk meneruskan perintah langsung ke perangkat agen via FCM
const sendFcmCommand = async (deviceId: string, payloadData: Record<string, string>): Promise<boolean> => {
  const device = await ChildDevice.findOne({ deviceId });
  if (!device || !device.fcmToken || !messaging) return false;

  try {
    await messaging.send({
      token: device.fcmToken,
      data: payloadData,
      android: { priority: 'high' } // Memaksa pesan langsung dieksekusi di background Android
    });
    return true;
  } catch (e) {
    console.error("Gagal mengirimkan instruksi via FCM:", e);
    return false;
  }
};

export const triggerLock = async (req: AuthenticatedRequest, res: Response) => {
  const { deviceId, action } = req.body; // action: "LOCK" | "UNLOCK"
  const success = await sendFcmCommand(deviceId, { command: action });
  
  if (success) {
    await ChildDevice.findOneAndUpdate({ deviceId }, { isLocked: action === "LOCK" });
    res.json({ message: `Instruksi ${action} sukses dipancarkan ke target.` });
  } else {
    res.status(500).json({ message: 'Gagal menghubungi perangkat anak.' });
  }
};

export const triggerFlash = async (req: AuthenticatedRequest, res: Response) => {
  const { deviceId, mode } = req.body; // mode: "ON" | "OFF" | "BLINK" | "FORCE"
  const success = await sendFcmCommand(deviceId, { command: "FLASH", mode });
  res.json({ success, message: success ? 'Sinyal lampu kilat berhasil terkirim.' : 'Gagal mengirim sinyal.' });
};

export const captureCamera = async (req: AuthenticatedRequest, res: Response) => {
  const { deviceId, lens } = req.body; // lens: "DEPAN" | "BELAKANG"
  const success = await sendFcmCommand(deviceId, { command: "CAPTURE_CAMERA", lens });
  res.json({ success, message: success ? 'Instruksi potret kamera dikirim.' : 'Perangkat offline.' });
};
