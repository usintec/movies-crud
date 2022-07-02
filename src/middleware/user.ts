import { DB } from "../database/model";

class UserValidationMiddleware {
    isEmail(req, res, next){
        let regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regExp.test(req.body.email)) return next();
        res.status(403).send({
            sucess: false,
            message: 'Not valid Email'
        });
    }

    isPassword(req, res, next){
        let regExp = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
        if(regExp.test(req.body.password)) return next();
        res.status(403).send({
            sucess: false,
            message: 'Not valid password. Password should have minumum of 8 characters with at least 2 numericals'
        });   
    }

    async isEmailUnique(req, res, next){
        try{
            let user = DB.userModel.findOne({
                where: { email: req.body.email }
            });
            user.then(val => {console.log(val);
                if(!val) return next();
                res.status(403).send({
                    sucess: false,
                    message: 'Duplicate email'
                });
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }

    async confirmPassword(req, res, next){
        if(req.body.password === req.body.confirmPassword) return next();
        res.status(403).send({
            sucess: false,
            message: 'password and confirmPassword fields do not merch'
        });
    }
}
const userValidationMiddleware = new UserValidationMiddleware();
export { userValidationMiddleware };