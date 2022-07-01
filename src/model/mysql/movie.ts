/**
 * Create Movie Model
 */
class MovieMode {
    private _movie: any;
    /**
     * 
     * @param sequelize pass new sequalize object
     * @param Sequelize pass sequalize class
     * @returns 
     */
    constructor(sequelize: any, Sequelize: any){
        this._movie = sequelize.define('movie', {
            synopsis: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            movieStamp: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            yearOfRelease: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            language: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            movieType: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            featureImage: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        });
        return this._movie;
    }
}
export { MovieMode }