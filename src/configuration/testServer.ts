import { BaseConfig } from "./baseConfig";
import { Config } from "./config";
/**
 * Create Staging Server
 */
class TestServer extends BaseConfig{
    constructor(){
        super( new Config(
            process.env.TEST_HOST,
            Number.parseInt(process.env.TEST_PORT),
            process.env.TEST_DB,
            process.env.TEST_DB_HOST,
            process.env.TEST_DB_USER,
            process.env.TEST_DB_PASSWORD,
            Number.parseInt(process.env.TEST_DB_PORT),
            process.env.TEST_SECRET,
            Number.parseInt(process.env.TEST_TOTAL_PAGE_BUFFER),
            process.env.TEST_MOVIES_DB_URL,
            Number.parseInt(process.env.TEST_MOVIES_PER_PAGE)))
    }
}
export { TestServer }