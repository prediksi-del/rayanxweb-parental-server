import { Router } from 'express';
import { registerParent, loginParent } from '../controllers/auth.controller';

const router = Router();
router.post('/register', registerParent);
router.post('/login', loginParent);

export default router;
