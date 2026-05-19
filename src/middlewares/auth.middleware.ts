import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  parentId?: string;
  user?: any;
}

export const protectParent = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Akses ditolak, token tidak disertakan.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    req.parentId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token tidak valid atau telah kedaluwarsa.' });
  }
};
