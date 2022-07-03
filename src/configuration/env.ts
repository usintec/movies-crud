import { DevelopmentServer } from "./devServer";
import { ProductionServer } from "./prodServer";
import { StagingServer } from "./stagServer";
import { TestServer } from "./testServer";

class EnviromentSetup {
    private _envName: String;
    constructor(envName: String){
        this._envName = envName;
    }
    public get enviroment(){
        switch(this._envName){
            case 'DEV':
                return new DevelopmentServer().Config;
                break;
            case 'STAGING':
                return new StagingServer().Config;
                break;
            case 'PROD':
                return new ProductionServer().Config;
                break;
            case 'TEST':
                return new TestServer().Config;
                break;
        }
        return null;
    }
}
export { EnviromentSetup }