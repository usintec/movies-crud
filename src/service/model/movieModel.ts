import { MovieType } from "./movieType";

/**
 * Create MoviesModel
 */
class MoviesModel {
    /**
     * class private members for data abstraction
     */
    private _synopsis: String;
    private _movieStamp: String;
    private _title: String;
    private _yearOfRelease: String;
    private _language: String;
    private _movieType: MovieType;
    private _featureImage: String;

    /**
     * Construct Movie's object from its class
     * @param synopsis movie's description
     * @param movieStamp movie's unique identifier from third party movies db
     * @param title movie's title
     * @param yearOfRelease movie's year of release
     * @param language movie's language
     * @param movieType movie's type e.g Movies, Series or Musical movies
     * @param featureImage movie's poster
     */
    constructor(synopsis: String, movieStamp: String,
        title: String, yearOfRelease: String, language: String,
        movieType: MovieType, featureImage: String){
            this._synopsis = synopsis;
            this._movieStamp = movieStamp;
            this._title = title,
            this._yearOfRelease = yearOfRelease,
            this._language = language,
            this._movieType = movieType,
            this._featureImage = featureImage
        }
    // return class member synopsis;
    public get synopsis(){
        return this._synopsis;
    }
    // return class member movieStamp
    public get movieStamp(){
        return this._movieStamp;
    }
    // return class member title
    public get title(){
        return this._title;
    }
    // return class member yearOfRelease
    public get yearOfRelease(){
        return this._yearOfRelease;
    }
    // return class member language
    public get language(){
        return this._language;
    }
    //return class member movieType
    public get movieType(){
        return this._movieType;
    }
    //return class member featureImage
    public get featureImage(){
        return this._featureImage;
    }
}
export { MoviesModel }