import { Router } from 'express';
import { triggerLock, triggerFlash, captureCamera } from '../controllers/control.controller';
import { protectParent } from '../middlewares/auth.middleware';

const router = Router();
router.use(protectParent); // Memproteksi seluruh tombol kontrol jarak jauh wajib login orang tua

router.post('/lock-status', triggerLock);
router.post('/flash', triggerFlash);
router.post('/camera-trigger', captureCamera);

export default router;
