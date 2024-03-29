import * as jwt from 'jsonwebtoken';
import { EnviromentSetup } from '../configuration/env';
import { DB } from '../database/model';
// get appropriate configurations e.g DEV, STAGING OR PROD
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
/**
 * Create Authentication Middleware
 */
class AuthenticationMiddleware {
    /**
     * verify if the user provider a token and
     * if the provided token is valid
     * @param req request
     * @param res response
     * @param next next line of action
     * @returns 
     */
    verifyToken(req, res, next){
        let token = req.headers['authorization'];
        if(!token) return res.status('403').send({
            message: 'No token is provided',
            sucess: false
        });
        jwt.verify(token,configuration.secret as string, (err, decoded) =>{
            if(err) return res.status('403').send({
                message: 'Unauthorised',
                sucess: false
            });
            req.userId = decoded.id;
            next();
        });
    }   
    /**
     * verify if the user is an admin in our db
     * @param req request
     * @param res response
     * @param next next line of action
     */
    async verifyAdmin(req, res, next){
        try{
            let user = await DB.userModel.findByPK(req.userId);
            if(user.getRoles().include('admin')) next();
            res.status(403).send({
                message: 'Required Admin role', 
                sucess: false});
        }catch(err){
            res.status('403').send({
                message: 'Admin not found', 
                status: false});
        }
    }
    /**
     * verify if the user is truely one of our user in db
     * @param req 
     * @param res 
     * @param next 
     */
    async verifyUser(req, res, next){
        try{
            let user = await DB.userModel.findByPk(req.userId);
            let roles = await user.getRoles();
            let role = roles.find(value => value.name == 'user')
            if(role) return next();
            res.status(403).send({
                message: 'Required User role', 
                sucess: false});
        }catch(err){
            res.status('403').send({
                message: err.message, 
                status: false});
        }
    }
}
let authenticationMiddleware = new AuthenticationMiddleware();
export { authenticationMiddleware };