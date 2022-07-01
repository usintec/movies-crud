/**
 * Create UserModel
 */
class UserModel {
    private _user: any;
    /**
     * 
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns 
     */
    constructor(sequelize: any, Sequelize: any){
        this._user = sequelize.define('user', {
            email: {
                type: Sequelize.STRING,
                isEmail: true,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                min: 6,
                allowNull: false,
            },
        },
        {
            scopes: {
              withoutPassword: {
                attributes: {exclude: ['password']}
              }
            }
          });
        return this._user;
    }
}
export { UserModel}