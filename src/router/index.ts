import { UserRouter } from './user';
import { MoviesRouter } from './movie';
import { Application } from 'express';
import { HomeRouter } from './home';

class RegisterRoutes{
    private _app: Application;
    constructor(app: Application){
        this._app = app;
        this.register();
    }
    private register(){
        // Routes
        this._app.get('/',  HomeRouter);
        this._app.use('/api/user', UserRouter);
        this._app.use('/api/movies/', MoviesRouter);
    }
}
export { RegisterRoutes };