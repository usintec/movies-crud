import { EnviromentSetup } from "../configuration/env";
import { MovieInterface } from "./model/movieInterface";

const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
class MovieService {
    private _moviesCollection: Array<MovieInterface>;
    constructor(moviesCollection: Array<MovieInterface>){
            this._moviesCollection = moviesCollection;
        }
    public add(movieCollection: MovieInterface){
        if(this._moviesCollection.length < configuration.totalPageBuffer) 
            this._moviesCollection.push(movieCollection);
    }
    public remove(){ 
        if(this._moviesCollection.length > 1) this._moviesCollection.shift();
    }
    public async fetchMovies(): Promise<void>{

    }
    
    public async addMovieToFavourite(): Promise<void>{
        
    }

    public async removeMovieFromFavourite(): Promise<void>{

    }
    public async readFavouriteMovie(): Promise<void>{

    }
    public async createMovie(): Promise<void>{

    }
    public async updateMovie(): Promise<void>{
        
    }

}
let movieService = new MovieService([]);
export { movieService }