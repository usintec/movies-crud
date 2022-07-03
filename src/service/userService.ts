import { EnviromentSetup } from "../configuration/env";
import { DB } from "../database/model";
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;// get appropriate configuration e.g DEV, STAGING OR PROD
const User = DB.userModel;
const Role = DB.roleModel;

class UserService {
    async register(email: string, password: string){
        try{
            let user = await User.create({
                email: email, password: bcrypt.hashSync(password)});
            const token = jwt.sign({id: user.id}, configuration.secret as string,{
                expiresIn: 86400 });
            let role = await Role.findAll({where: {name: 'user' } }); 
            await user.setRoles(role);
            return {token: token, role: role, userId: user.id, userEmail: user.email};
        }catch(err){ throw err }
    }

    async login(email: string, password: string){
        try {
            let user = await User.findOne({
                where: { email: email } });
            if(!user) throw 'User not found';
            let passwordValidity = bcrypt.compareSync(password, user.password);
            if(!passwordValidity) throw 'Invalid password';
            let token = jwt.sign({id: user.id}, configuration.secret as string, {expiresIn: 86400});
            return {token: token, userId: user.id, userEmail: user.email};
        }catch(err){ throw err; }
    }
}
const userService = new UserService();
export { userService };