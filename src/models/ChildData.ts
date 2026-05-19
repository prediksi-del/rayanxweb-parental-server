import { Schema, model } from 'mongoose';

// Log SMS terpadu (SMS Baru, SMS Lama, SMS)
const SmsLogSchema = new Schema({
  deviceId: { type: String, required: true },
  type: { type: String, enum: ['incoming', 'outgoing'] },
  address: { type: String },
  body: { type: String },
  timestamp: { type: Date }
});

// Log Panggilan Telepon
const CallLogSchema = new Schema({
  deviceId: { type: String, required: true },
  contactName: { type: String },
  phoneNumber: { type: String },
  callType: { type: String }, // missed, received, dialed
  duration: { type: Number }, // detik
  timestamp: { type: Date }
});

// Log Salinan Clipboard teks
const ClipboardLogSchema = new Schema({
  deviceId: { type: String, required: true },
  textCopied: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export const SmsLog = model('SmsLog', SmsLogSchema);
export const CallLog = model('CallLog', CallLogSchema);
export const ClipboardLog = model('ClipboardLog', ClipboardLogSchema);
