import { DB } from "../model/mysql";
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { EnviromentSetup } from "../configuration/env";
// get appropriate configuration e.g DEV, STAGING OR PROD
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
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
            let user = await DB.userModel.create({
                email: req.body.email.toString(),
                password: bcrypt.hashSync(req.body.password)
            });
            let role = await DB.roleModel.findAll({where: {name: 'user' } }); 
            const token = jwt.sign({id: user.id}, configuration.secret as string,{
                expiresIn: 86400
            });
            await user.setRoles(role);
            res.status(200).send({
                user: user,
                token: token,
                role: role,
                sucess: true
            });
        }catch(err){
            console.log(err);
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
            let user = await DB.userModel.findOne({
                where: { email: req.body.email as string }
            });
            if(!user) return res.status(403).send({
                message: 'User not found',
                sucess: false
            })
            let passwordValidity = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordValidity) return res.status(403).send({message: 'Invalid password', success: false});
            let token = jwt.sign({id: user.id}, configuration.secret as string, {expiresIn: 86400});
            res.status(200).send({
                user: user,
                token: token,
                status: true,
            });
        }catch(err){
            console.log(err.message);
            res.status(403).send({
                message: err.message, 
                success: false});
        }
    }
}
let userController = new UserController();
export { userController };