
/**
 * Create Role Model
 */
class RoleModel {
    private _role: any;
    /**
     * 
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns 
     */
    constructor(sequelize: any, Sequelize: any){
        this._role = sequelize.define('role', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });
        return this._role;
    }
}
export { RoleModel }