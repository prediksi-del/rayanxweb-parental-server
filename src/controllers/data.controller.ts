import { Request, Response } from 'express';
import { SmsLog, CallLog, ClipboardLog } from '../models/ChildData';

// Menerima kiriman data berkala dari aplikasi background anak (Android client)
export const receiveDeviceSyncLog = async (req: Request, res: Response) => {
  try {
    const { deviceId, dataType, payload } = req.body; // dataType: 'sms' | 'call' | 'clipboard'

    if (dataType === 'sms') {
      await SmsLog.insertMany(payload.map((item: any) => ({ deviceId, ...item })));
    } else if (dataType === 'call') {
      await CallLog.insertMany(payload.map((item: any) => ({ deviceId, ...item })));
    } else if (dataType === 'clipboard') {
      await ClipboardLog.create({ deviceId, textCopied: payload.text });
    }

    res.status(200).json({ success: true, message: "Sinkronisasi log data anak berhasil disimpan." });
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses unggahan sinkronisasi data." });
  }
};
