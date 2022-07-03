import { DB } from './src/database/model';

class DatabaseSync {
    public async sync(renewDB = false){
        //DB SYCN
        DB.sequelize.sync({force: renewDB}).then(() => {
            DB.roleModel.create({
            id: 1,
            name: DB.Roles[0].toString()
            }).then(()=>console.log('create role 1'))
            .catch((err)=>console.log(err.message));
            DB.roleModel.create({
            id: 2,
            name: DB.Roles[1].toString()
            }).then(()=>console.log('create role 2'))
            .catch((err)=>console.log(err.message));
        });
    }
}
export { DatabaseSync };