import { BaseConfig } from "./baseConfig";
import { Config } from "./config";
/**
 * Create Production Server
 */
class ProductionServer extends BaseConfig{
    constructor(){
        super( new Config(
            process.env.PRODUCTION_HOST,
            Number.parseInt(process.env.PRODUCTION_PORT),
            process.env.PRODUCTION_DB,
            process.env.PRODUCTION_DB_HOST,
            process.env.PRODUCTION_DB_USER,
            process.env.PRODUCTION_DB_PASSWORD,
            Number.parseInt(process.env.PRODUCTION_DB_PORT),
            process.env.PRODUCTION_SECRET
        ))
    }
}
export { ProductionServer }