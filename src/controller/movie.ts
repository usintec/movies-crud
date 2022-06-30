import { movieService } from "../service/movieService";

class MoviesController {
    async fetchMovies(req, res){
        try{
            let data = await movieService.fetchMovies();
            console.log('done sucessfully');
            // console.log(data['data']);
            res.status(200).send({
                data: data['data'],
                success: true,
                message: 'fetched movies'
            });
        }catch(err){
            if(err.request) console.log('request error')
            if(err.response) console.log('response error');
            // console.log(err);
            res.status(403).send({
                success: false,
                message: err.message
            });
        }
    }
}
let moviesController = new MoviesController();
export { moviesController }