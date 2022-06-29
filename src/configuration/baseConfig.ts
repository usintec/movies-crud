import { Config } from "./config";
/**
 * Create Abstract Class BaseConfig
 */
abstract class BaseConfig {
    private _config: Config;
    /**
     * @param config take configuration as a parameter
     */
    constructor(config: Config){
        this._config = config;
    }
    // return configurations
    public get Config() {
        return this._config;
    }
}
export { BaseConfig }