import { Application } from "express";
import { EnviromentSetup } from './src/configuration/env';
import { DatabaseSync } from './dbSync';
import { RegisterRoutes } from './src/router';
import * as bodyParser from 'body-parser';
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
const port = configuration.portNo;

class App {
    private _app: Application;
    constructor(app: Application){
        this._app = app;
        // Body parsing Middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    start(){
        // Start the server
        try{
            new DatabaseSync().sync(false); // pass true to delete and re-create the db
            new RegisterRoutes(this._app); // register all routes with the application
            this._app.listen(port, () => { //start the application
            console.log(`Server running on http://localhost:${port}`)
            });
        }catch(err){
            // console.log(`Error occurred: ${err.message}`)
        }
    }
}
export { App };
