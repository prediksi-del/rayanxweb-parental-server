import { Router } from 'express';
import { receiveDeviceSyncLog } from '../controllers/data.controller';

const router = Router();

// Jalur ini diakses secara anonim/terbuka khusus untuk pengiriman background dari aplikasi client anak
router.post('/sync-push', receiveDeviceSyncLog);

export default router;
