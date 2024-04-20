import { Router } from 'express';
import { ResidentController } from '../controllers/residentController';

const controller = new ResidentController();
const router = Router();

router.get('/:wallet', controller.getResident);
router.post('/', controller.postResident);
router.patch('/:wallet', controller.patchResident);
router.delete('/:wallet', controller.deleteResident);

export default router;