import express from 'express';
import { userController } from '../controller/user';
import { userValidationMiddleware } from '../middleware/user';
const UserRouter = express.Router();
/**
 * Add routes to UserRouter
 */
UserRouter.post('/register', [
    userValidationMiddleware.isEmail, 
    userValidationMiddleware.isEmailUnique,
    userValidationMiddleware.isPassword, 
    userValidationMiddleware.confirmPassword],  userController.signUpUser);

UserRouter.post('/signin', [
    userValidationMiddleware.isEmail, 
    userValidationMiddleware.isPassword], userController.singIn);

export { UserRouter };