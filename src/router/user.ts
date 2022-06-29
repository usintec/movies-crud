import express from 'express';
import { userController } from '../controller/user';
const UserRouter = express.Router();
/**
 * Add routes to User Router
 */
UserRouter.post('/register', userController.signUpUser);
UserRouter.post('/signin', userController.singIn);

export { UserRouter };