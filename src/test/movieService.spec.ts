import { MovieInterface } from "../service/model/movieInterface";
import { MoviesModel } from "../service/model/movieModel";
import { movieService } from "../service/movieService"

describe("Movie Service", () => {
    let moviesCollection: Array<MovieInterface> = [];
    let moviesList: Array<MoviesModel> = [];
    let moviesInterface: MovieInterface;
    let movieId: number;
    beforeEach(() => {
        moviesList = [
            new MoviesModel(
                "Angel struggles to get find her true love.",
                "001bc0fd-9cfa-4bce-aa94-f5765f2bdb33",
                "Ajo Onye isi","2020","English",0,
                "https://acomart-files.s3.eu-west-2.amazonaws.com/d4337331-53c8-4190-810d-6d88088fe05e/Ajo-Onye-Isi.png"),
            new MoviesModel(
                "Watch Omanfranii 2 on Afrostream",
                "001ed24a-4b17-463f-b7d7-ffb2709a9e67",
                "Omanfranii 2","2018","Twi",0,
                "https://acomart-files.s3.eu-west-2.amazonaws.com/72d30f6b-0d4e-4d6e-a870-aadf72f75215/Oman-Franie.webp"),
            new MoviesModel(
                "Watch Kowhi Nii Baa on Afrostream.",
                "0165bab6-5cc8-4310-8755-09ac04290624",
                "Kowhi Nii Baa 1","2018","Twi",0,
                "https://acomart-files.s3.eu-west-2.amazonaws.com/0c833e40-d60a-4406-bc1b-655e903b1946/KOHWINIIBAA.jpg")
        ];
        moviesInterface = {
            pageNo: 1,
            moviesList: moviesList
        }
        moviesCollection =[
            {
                pageNo: 1,
                moviesList: moviesList
            }
        ]
    });
    it("Create titanic movie in the Database", async () => {
        let result = await movieService.createMovie(
            "Watch Kowhi Nii Baa on Afrostream.",
            "0165bab6-5cc8-4310-8755-09ac04290624",
            "titanic","2018","Twi",'0',
            "https://acomart-files.s3.eu-west-2.amazonaws.com/0c833e40-d60a-4406-bc1b-655e903b1946/KOHWINIIBAA.jpg",
            '1',null);
        movieId = result.id;
        expect(result.title).toEqual("titanic");
    });
    it("should search for titanic movie in the Database", async () => {
        let result = await movieService.search('titanic');
        expect(result.rows[0].title).toEqual('titanic');
    });
    it("Create new movie in the Database", async () => {
        let result = await movieService.createMovie(
            "Watch Kowhi Nii Baa on Afrostream.",
            "0165bab6-5cc8-4310-8755-09ac04290624",
            "Kowhi Nii Baa 1","2018","Twi",'0',
            "https://acomart-files.s3.eu-west-2.amazonaws.com/0c833e40-d60a-4406-bc1b-655e903b1946/KOHWINIIBAA.jpg",
            '1',null);
        movieId = result.id;
        expect(result.title).toEqual("Kowhi Nii Baa 1");
    });
    
    it("Delete movie from Database", async () => {
        let result = await movieService.deleteMovie(movieId.toString());
        expect(result).toBe(1)});
    it('Remove movie from collecton', () => {
        let result = movieService.remove();
        expect(result).toEqual(0)});
    it("Add movies to collection", () => {
        let result = movieService.add(moviesInterface);
        expect(result).toBe(true)});
    
})