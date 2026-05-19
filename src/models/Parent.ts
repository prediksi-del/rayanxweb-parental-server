import { Schema, model } from 'mongoose';

const ParentSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Parent = model('Parent', ParentSchema);
