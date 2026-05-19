import { Router, Response } from 'express';
import { sendInstantCommand } from '../controllers/control.controller';
import { protectParent, AuthenticatedRequest } from '../middlewares/auth.middleware';

const router = Router();

// Memproteksi seluruh tombol kontrol jarak jauh wajib login orang tua
router.use(protectParent);

// 🔒 Tombol 1: Mengunci / Membuka Kunci Layar HP Anak
router.post('/lock-status', (req: AuthenticatedRequest, res: Response) => {
  // Membaca input status (misal body: { deviceId: "xyz", action: "LOCK" })
  sendInstantCommand(req, res);
});

// 🔦 Tombol 2: Menyalakan / Mematikan Lampu Kilat Jarak Jauh
router.post('/flash', (req: AuthenticatedRequest, res: Response) => {
  // Memastikan aksi dikunci ke instruksi "FLASH" sebelum dilempar ke controller
  req.body.action = "FLASH"; 
  sendInstantCommand(req, res);
});

// 📸 Tombol 3: Ambil Foto Senyap Kamera Depan / Belakang
router.post('/camera-trigger', (req: AuthenticatedRequest, res: Response) => {
  // Memastikan aksi dikunci ke instruksi "CAPTURE_CAMERA" sebelum dilempar ke controller
  req.body.action = "CAPTURE_CAMERA";
  sendInstantCommand(req, res);
});

export default router;
