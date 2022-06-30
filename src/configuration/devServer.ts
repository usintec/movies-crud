import { BaseConfig } from "./baseConfig";
import { Config } from "./config";
/**
 * Create Development Server
 */
class DevelopmentServer extends BaseConfig{
    constructor(){
        super( new Config(
            process.env.DEV_HOST,
            Number.parseInt(process.env.DEV_PORT),
            process.env.DEV_DB,
            process.env.DEV_DB_HOST,
            process.env.DEV_DB_USER,
            process.env.DEV_DB_PASSWORD,
            Number.parseInt(process.env.DEV_DB_PORT),
            process.env.DEV_SECRET,
            Number.parseInt(process.env.DEV_TOTAL_PAGE_BUFFER)
        ))
    }
}
export { DevelopmentServer }