import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Parent } from '../models/Parent';

export const registerParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      res.status(400).json({ message: 'Email orang tua sudah terdaftar.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = await Parent.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'Pendaftaran akun orang tua berhasil.', id: newParent._id });
  } catch (error) {
    res.status(500).json({ message: 'Gagal melakukan registrasi.', error });
  }
};

export const loginParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const parent = await Parent.findOne({ email });
    if (!parent) {
      res.status(404).json({ message: 'Akun orang tua tidak ditemukan.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Kata sandi salah.' });
      return;
    }

    const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(200).json({ token, message: 'Autentikasi login berhasil.' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kegagalan login sistem.', error });
  }
};
