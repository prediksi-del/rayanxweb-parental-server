import { Router, Response } from 'express';
import { sendInstantCommand } from '../controllers/control.controller';
import { protectParent, AuthenticatedRequest } from '../middlewares/auth.middleware';

const router = Router();

// Proteksi global untuk seluruh endpoint di bawah ini
router.use(protectParent);

// 🔒 1. Mengunci / Membuka Kunci Layar HP Anak
router.post('/lock-status', (req: AuthenticatedRequest, res: Response) => {
  sendInstantCommand(req, res);
});

// 🔦 2. Mengontrol Lampu Kilat (Flashlight)
router.post('/flash', (req: AuthenticatedRequest, res: Response) => {
  req.body.action = "FLASH"; 
  sendInstantCommand(req, res);
});

// 📸 3. Memotret Gambar Secara Diam-diam
router.post('/camera-trigger', (req: AuthenticatedRequest, res: Response) => {
  req.body.action = "CAPTURE_CAMERA";
  sendInstantCommand(req, res);
});

export default router;
