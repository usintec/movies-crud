/**
 * Define confugration clas
 */
class Config{
    private _hostAddr: String;
    private _portNo: Number;
    private _dbName: String;
    private _dbHostAddr: String;
    private _dbUser: String
    private _dbPassword: String;
    private _dbPortNo: Number;
    private _secret: String;
    private _totalPageBuffer: Number;
    private _moviesDbURL: String;
    private _moviesPerPage: Number;
    /**
     * 
     * @param hostAddr server host address
     * @param portNo server port number
     * @param db database name
     * @param dbHostAddr database host address
     * @param dbUser database user
     * @param dbPassword database password
     * @param dbPortNo database port number
     * @param secret authentication secret
     * @param totalPageBuffer max page(buffer) to hold movies from thirdParty movies db
     * @param moviesDbURL third party integration (movies database url)
     * @param moviesPerPage number of movies on a single page
     */
    constructor(hostAddr: String, portNo: Number, dbName: String, dbHostAddr: String, 
        dbUser: String, dbPassword: String, dbPortNo: Number, secret: String, 
        totalPageBuffer: Number, moviesDbURL: String, moviesPerPage: Number){
            this._hostAddr = hostAddr;
            this._portNo = portNo;
            this._dbName = dbName;
            this._dbHostAddr = dbHostAddr;
            this._dbUser = dbUser;
            this._dbPassword = dbPassword;
            this._dbPortNo = dbPortNo;
            this._secret = secret;
            this._totalPageBuffer = totalPageBuffer;
            this._moviesDbURL = moviesDbURL;
            this._moviesPerPage = moviesPerPage;
    }
    // return host address
    public get hostAddr(): String{
        return this._hostAddr;
    }
    // return port number
    public get portNo(): Number{
        return this._portNo;
    }
    // return database name 
    public get dbName(): String{
        return this._dbName;
    }
    // return database host address
    public get dbHostAddr(): String{
        return this._dbHostAddr;
    }
    // return database user
    public get dbUser(): String{
        return this._dbUser;
    }
    // return database password
    public get dbPassword(): String{
        return this._dbPassword;
    }
    // return database port number
    public get dbPortNo(): Number{
        return this._dbPortNo;
    }
    // return authentication secret
    public get secret(): String{
        return this._secret;
    }
    // return total page buffer 
    public get totalPageBuffer(): Number{
        return this._totalPageBuffer;
    }
    // return movies database url
    public get moviesDatabaseURL(): String{
        return this._moviesDbURL;
    }
    //return movies per page
    public get moviesPerPage(): Number{
        return this._moviesPerPage;
    }
}
export { Config };