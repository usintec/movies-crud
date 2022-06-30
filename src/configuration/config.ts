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
     */
    constructor(hostAddr: String, portNo: Number, dbName: String, dbHostAddr: String, 
        dbUser: String, dbPassword: String, dbPortNo: Number, secret: String, 
        totalPageBuffer: Number, moviesDbURL: String){
            this._hostAddr = hostAddr;
            this._portNo = portNo;
            this._dbName = dbName;
            this._dbHostAddr = dbHostAddr;
            this._dbUser = dbUser;
            this._dbPassword = dbPassword;
            this._dbPortNo = dbPortNo;
            this._secret = secret;
            this._totalPageBuffer = totalPageBuffer;
            this._moviesDbURL = moviesDbURL
    }
    // return host address
    public get hostAddr() {
        return this._hostAddr;
    }
    // return port number
    public get portNo(){
        return this._portNo;
    }
    // return database name 
    public get dbName(){
        return this._dbName;
    }
    // return database host address
    public get dbHostAddr(){
        return this._dbHostAddr;
    }
    // return database user
    public get dbUser(){
        return this._dbUser;
    }
    // return database password
    public get dbPassword(){
        return this._dbPassword;
    }
    // return database port number
    public get dbPortNo(){
        return this._dbPortNo;
    }
    // return authentication secret
    public get secret(){
        return this._secret;
    }
    // return total page buffer 
    public get totalPageBuffer(){
        return this._totalPageBuffer;
    }
    // return movies database url
    public get moviesDatabaseURL(){
        return this._moviesDbURL;
    }
}
export { Config };