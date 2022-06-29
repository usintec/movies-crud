import { DevelopmentServer } from "./devServer";
import { ProductionServer } from "./prodServer";
import { StagingServer } from "./stagServer";

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
            case 'PRODUCTION':
                return new ProductionServer().Config;
                break;
        }
        return null;
    }
}
export { EnviromentSetup }