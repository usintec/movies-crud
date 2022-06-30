import axios from "axios";
import { EnviromentSetup } from "../configuration/env";
import { HttpClient } from "./httpClient";
import { MovieInterface } from "./model/movieInterface";

const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
class MovieService extends HttpClient {
    private _moviesCollection: Array<MovieInterface>;

    constructor(moviesCollection: Array<MovieInterface>){
            super(configuration.moviesDatabaseURL as string);
            this._moviesCollection = moviesCollection;
        }

    public add(movieCollection: MovieInterface){
        if(this._moviesCollection.length < configuration.totalPageBuffer) 
            this._moviesCollection.push(movieCollection);
    }

    public get moviesCollection(){
        return this._moviesCollection;
    }

    public remove(){ 
        if(this._moviesCollection.length > 1) this._moviesCollection.shift();
    }
    public async fetchMovies(): Promise<any>{
        try{
            let movies = await this.instance.get<any>('/api/videos?paginate=1&per_page=20&page=1');
            return movies;
        }catch(err){
            throw err;
        };
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