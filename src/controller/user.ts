import { userService } from "../service/userService";
/**
 * Create UserController
 */
class UserController {
    /**
     * register a new user
     * @param req request
     * @param res response
     */
    async signUpUser(req, res){
        try{
            let data = await userService.register(req.body.email, req.body.password);
            res.status(200).send({
                userId: data.userId,
                userEmail: data.userEmail,
                token: data.token,
                role: data.role,
                sucess: true});
        }catch(err){
            res.status(403).send({
                message: err.message, 
                success: false});
        }
    }
    /**
     * Sing in an existing user
     * @param req request
     * @param res response
     * @returns null
     */
    async singIn(req, res){
        try {
            let data = await userService.login(req.body.email, req.body.password);
            res.status(200).send({
                userId: data.userId,
                userEmail: data.userEmail,
                token: data.token,
                status: true,
            });
        }catch(err){
            res.status(403).send({
                message: err.message, 
                success: false});
        }
    }
}
let userController = new UserController();
export { userController };