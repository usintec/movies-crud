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
                return new DevelopmentServer();
                break;
            case 'STAGING':
                return new StagingServer();
                break;
            case 'PRODUCTION':
                return new ProductionServer();
                break;
        }
        return null;
    }
}