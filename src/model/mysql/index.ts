import { DbInterface } from "./dbInterface";
import { EnviromentSetup } from "../../configuration/env";
import { UserModel } from "./user";
import { RoleModel } from "./role";
import { MovieMode } from "./movie";
import {Sequelize} from 'sequelize';
// get appropriate configuratios e.g Dev, Staging or Prod
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
// create sequelize object
const sequelize = new Sequelize(
    configuration.dbName as string,
    configuration.dbUser as string,
    configuration.dbPassword as string,{
        host: configuration.hostAddr as string,
        dialect: 'mysql',
        pool: {
            max: 10000,
            min: 0,
            idle: 2000,
        }
    });
/**
 * Create Index: Facade Pattern where DB 
 * becomes a bridge to other models and 
 * sequelize object.
 */
class Index {
    private _DB: DbInterface = {
        sequelize: '',
        Sequelize: '',
        userModel: '',
        roleModel: '',
        movieModel: '',
        Roles: []
    };
    constructor(){
        this._DB.sequelize = sequelize;
        this._DB.Sequelize = Sequelize;
        this._DB.userModel = new UserModel(sequelize, Sequelize);
        this._DB.roleModel = new RoleModel(sequelize, Sequelize);
        this._DB.movieModel = new MovieMode(sequelize, Sequelize);
        this._DB.Roles = ['admin', 'user'];

        this._DB.userModel.belongsToMany(this._DB.roleModel, {
            through: 'user_roles',
            foreignKey: 'roleId',
            otherKey: 'userId'
        });

        this._DB.roleModel.belongsToMany(this._DB.userModel, {
            through: 'user_roles',
            foreignKey: 'roleId',
            otherKey: 'userId'
        });

        this._DB.userModel.belongsToMany(this._DB.movieModel, {
            through: 'user_movies',
            foreignKey: 'movieId',
            otherKey: 'userId'
        });

        this._DB.movieModel.belongsToMany(this._DB.userModel, {
            through: 'user_movies',
            foreignKey: 'movieId',
            otherKey: 'userId'
        });
        
    }
    public get DB() {
        return this._DB;
    }
}
let DB = new Index().DB;
export { DB }