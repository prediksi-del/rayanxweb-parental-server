import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Definisikan interface Request yang terotentikasi secara global untuk dipakai di routes & controllers
export interface AuthenticatedRequest extends Request {
  parentId?: string;
  user?: any; // Tambahan opsional jika skema data internal Anda membutuhkan objek user utuh
}

export const protectParent = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Mengambil token dari header Authorization (Format: Bearer <TOKEN>)
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Akses ditolak, token tidak disertakan.' });
    return;
  }

  try {
    // Memverifikasi tanda tangan digital JWT menggunakan JWT_SECRET dari Environment Variable Vercel
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    
    // Menyimpan id orang tua hasil ekstrak token ke dalam request agar bisa dibaca oleh controller selanjutnya
    req.parentId = decoded.id;
    
    next(); // Lolos, lanjutkan ke fungsi controller utama
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token tidak valid atau telah kedaluwarsa.' });
  }
};
