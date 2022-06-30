import { EnviromentSetup } from "../configuration/env";
import { HttpClient } from "./httpClient";
import { MovieInterface } from "./model/movieInterface";
import { MoviesModel } from "./model/movieModel";
import { MovieType } from "./model/movieType";
// get appropriate configuration e.g DEV, STAGING OR PROD
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
/**
 * Create MovieService
 */
class MovieService extends HttpClient {
    //buffer to hold number of pages specified in configuration.totalPageBuffer
    private _moviesCollection: Array<MovieInterface>; 
    //used this to hold the page number of the pages in buffer.
    //this help to avoid linear search.Searching works in O(1)
    private _activeMoviesInBuffer = {};
    /**
     * Construct MovieService with empty buffer and
     * supply base url to the parent constructor
     * @param moviesCollection 
     */
    constructor(){
            super(configuration.moviesDatabaseURL as string);
            this._moviesCollection = [];
        }
    // return items in the buffer
    public get moviesCollection(){
        return this._moviesCollection;
    }
    /**
     * Store a collection/page along with the page number in the buffer only if the buffer is not full
     * Buffer size = configuration.totalPageBuffer
     * @param movieCollection 
     * @returns true true if collection/page is stored in the buffer otherwise return false
     */
    public add(movieCollection: MovieInterface): boolean{
        if(this._moviesCollection.length >= configuration.totalPageBuffer) return false;
        this._moviesCollection.push(movieCollection);
        //if the collection/page of movies in stored in the buffer sucessfuly, then store the 
        //page number as the key in the key value pair storage to be used for searching later
        this._activeMoviesInBuffer[movieCollection.pageNo.toString()] = 'active';
        return true;
    }
    /**
     * remove a collection/page of movies from the buffer provided the buffer has more than
     * one collection/page. if removed sucessfully, then remove/delete the collection/page's 
     * number from the key-value pair storage.
     */
    public remove(){ 
        let pageNo: Number;
        if(this._moviesCollection.length > 1) pageNo = this._moviesCollection.shift().pageNo;
        if(pageNo) delete this._activeMoviesInBuffer[pageNo.toString()]
    }
    /**
     * Third party integration
     * fetch movies from the third party movies database.
     * This function first check the buffer to find the requested collection/page of movies.
     * if found, it returns the collection/page otherwise it fecthes the movies from the third party db
     * @param pageNo page number to feched e.g 1 for the first page
     * @returns MovieInterface: a collection/page of movies
     */
    public async fetchMovies(pageNo: any): Promise<MovieInterface>{
        try{
            if(this._activeMoviesInBuffer.hasOwnProperty(pageNo)) //Do we have the collecton in the buffer
                return this.moviesCollection.find(value => value.pageNo == pageNo); //serch on O(n) and return the collection
            let movies = await 
                this.instance.get<any>(`/api/videos?paginate=1&per_page=${configuration.moviesPerPage}&page=${pageNo}`);
            movies = movies['data']['videos'];
            let tempMovies: MovieInterface = { //extract what we needed to create a collection/page of movies from the third party
                pageNo: Number.parseInt(movies['current_page']),
                moviesList: movies['data'].map(value => new MoviesModel(
                value['synopsis'],value['id'],value['title'],
                value['year_of_release'],
                value['language'],
                value['type'] == 0 ? MovieType.MOVIE : 
                    value['type'] == 1 ? MovieType.SERIES : MovieType.MUSIC,
                    value['featured_image']
                ))
            }
            if(!this.add(tempMovies)){//if the buffer is full, remove the oldes collection/page from the queue
                this.remove();
                this.add(tempMovies) //then push the new collection to the buffer
            };
            return tempMovies;
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
let movieService = new MovieService();
export { movieService }