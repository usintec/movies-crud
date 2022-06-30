import express from 'express';
import { userController } from '../controller/user';
const UserRouter = express.Router();
/**
 * Add routes to UserRouter
 */
UserRouter.post('/register', userController.signUpUser);
UserRouter.post('/signin', userController.singIn);

export { UserRouter };