import { EnviromentSetup } from "../configuration/env";
import { movieService } from "../service/movieService";
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
class MoviesController {
    async fetchMovies(req, res){
        try{
            let data = await movieService.fetchMovies(req.params.page);
            res.status(200).send({
                data: data,
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