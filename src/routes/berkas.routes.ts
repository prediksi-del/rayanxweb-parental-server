import { Router } from 'express';
import { exploreDirectory } from '../controllers/berkas.controller';
import { protectParent } from '../middlewares/auth.middleware';

const router = Router();
router.get('/list', protectParent, exploreDirectory);

export default router;
