import { Router } from 'express';
import { onlyCounselor, onlyManager } from '../middlewares/authorizationMiddleware';
import { TopicFileController } from '../controllers/topicFileController';

const controller = new TopicFileController()
const router = Router();

router.get('/:hash/:fileName', controller.getTopicFile);
router.get('/:hash/', controller.getTopicFiles);
router.post('/:hash/', onlyCounselor, controller.addTopicFile);
router.delete('/:hash/:fileName', onlyManager, controller.deleteTopicFile);
router.delete('/:hash/', onlyManager, controller.deleteAllTopicFiles);

export default router;