import { BaseConfig } from "./baseConfig";
import { Config } from "./config";
/**
 * Create Production Server
 */
class ProductionServer extends BaseConfig{
    constructor(){
        super( new Config(
            process.env.PROD_HOST,
            Number.parseInt(process.env.PROD_PORT),
            process.env.PROD_DB,
            process.env.PROD_DB_HOST,
            process.env.PROD_DB_USER,
            process.env.PROD_DB_PASSWORD,
            Number.parseInt(process.env.PROD_DB_PORT),
            process.env.PROD_SECRET,
            Number.parseInt(process.env.PROD_TOTAL_PAGE_BUFFER),
            process.env.PROD_MOVIES_DB_URL,
            Number.parseInt(process.env.PROD_MOVIES_PER_PAGE)))
    }
}
export { ProductionServer }