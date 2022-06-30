import { BaseConfig } from "./baseConfig";
import { Config } from "./config";
/**
 * Create Staging Server
 */
class StagingServer extends BaseConfig{
    constructor(){
        super( new Config(
            process.env.STAGING_HOST,
            Number.parseInt(process.env.STAGING_PORT),
            process.env.STAGING_DB,
            process.env.STAGING_DB_HOST,
            process.env.STAGING_DB_USER,
            process.env.STAGING_DB_PASSWORD,
            Number.parseInt(process.env.STAGING_DB_PORT),
            process.env.STAGING_SECRET,
            Number.parseInt(process.env.STAGING_TOTAL_PAGE_BUFFER)
        ))
    }
}
export { StagingServer }