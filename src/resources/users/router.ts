import { Router } from 'express';
import * as userController from './controller';
import { validateBody } from '../../middlewares/validation';
import { userCreateSchema, loginSchema } from './schema';

const router = Router();

router.post('/signup', validateBody(userCreateSchema), userController.createUser);
router.post('/login', validateBody(loginSchema), userController.loginUser);

export default router;
