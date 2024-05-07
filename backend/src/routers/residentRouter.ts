import { Router } from 'express';
import { ResidentController } from '../controllers/residentController';
import { onlyCounselor, onlyManager } from '../middlewares/authorizationMiddleware';

const controller = new ResidentController();
const router = Router();

router.get('/:wallet', controller.getResident);
router.post('/', onlyCounselor, controller.postResident);
router.patch('/:wallet', onlyManager, controller.patchResident);
router.delete('/:wallet', onlyManager, controller.deleteResident);

export default router;