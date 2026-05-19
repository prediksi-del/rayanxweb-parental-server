import { Schema, model } from 'mongoose';

const ChildDeviceSchema = new Schema({
  parentId: { type: Schema.Types.ObjectId, ref: 'Parent', required: true },
  deviceId: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  ipAddress: { type: String },
  batteryLevel: { type: Number, default: 0 },
  simInfo: { type: String },
  fcmToken: { type: String, required: true }, // Digunakan untuk mengirimkan sinyal perintah instan ke hp anak
  antiUninstallMode: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  lastOnline: { type: Date, default: Date.now }
});

export const ChildDevice = model('ChildDevice', ChildDeviceSchema);
