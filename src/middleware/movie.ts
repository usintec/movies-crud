import { DB } from "../model/mysql";

class MovieValidationMiddleware{
    moviesValidation(req, res, next){
        let error: Array<String> = [];
        if(!req.body.title) error.push('title can not be empty');
        if(!req.body.yearOfRelease) error.push('year of release can not be empty');
        if(!req.body.movieType) error.push('movie type can not be empty');

        if(typeof req.body.title !== 'string' ||
            req.body.title.trim() === '' ||
            !Number.isNaN(Number(req.body.title)))
                error.push('title can not be a number');

        if(!(typeof req.body.yearOfRelease !== 'string' ||
            req.body.yearOfRelease.trim() === '' ||
            !Number.isNaN(Number(req.body.yearOfRelease))))
                error.push('year of release should be a number');

        if(!(typeof req.body.movieType !== 'string' ||
            req.body.movieType.trim() === '' ||
            !Number.isNaN(Number(req.body.movieType))))
                error.push('movie type should be a number');

        if(req.body.movieType.length > 1)
            error.push('movie type should be one digit');
        
        if(parseInt(req.body.movieType) > 2)
            error.push("movie type can only be '0' for movies or '1' for series or '2' for music");

        if (error.length == 0) return next();
        res.status(403).send({
            sucess: false,
            message: 'validation error',
            error: error
        });
    }

    keywordValidation(req, res, next){
        let error: Array<String> = [];
        if(!req.params.keyword) error.push('keyword can not be empty. pass a parameter (keyword) to search');

        if(typeof req.params.keyword !== 'string' ||
            req.params.keyword.trim() === '' ||
            !Number.isNaN(Number(req.params.keyword)))
                error.push('keyword should be string');
        
        if (error.length == 0) return next();
            res.status(403).send({
                sucess: false,
                message: 'validation error',
                error: error
            });
    }

    async movieIdValidation(req, res, next){
        let error: Array<String> = [];
        if(!req.params.movieId) error.push('movie id can not be empty');

        if(!(typeof req.params.movieId !== 'string' ||
            req.params.movieId.trim() === '' ||
            !Number.isNaN(Number(req.params.movieId))))
                error.push('movie id should be a number');
        
        let movie = await DB.movieModel.findByPk(req.params.movieId);
        if(!movie) error.push('no movie with the specified id');

        if (error.length == 0) return next();
            res.status(403).send({
                sucess: false,
                message: 'validation error',
                error: error
            });
    }

    favouriteMovieValidation(req, res, next){
        let error: Array<String> = [];
        let result: String;
        let rank = ['title','yearOfRelease','language','movieType','id','createdAt'];
        if(!req.params.page) error.push('page number can not be empty. pass page number to fetch');

        if(!(typeof req.params.page !== 'string' ||
            req.params.page.trim() === '' ||
            !Number.isNaN(Number(req.params.page))))
            error.push('page param should be a number');

        if(req.params.limit) 
            if(!(typeof req.params.limit !== 'string' ||
                req.params.limit.trim() === '' ||
                !Number.isNaN(Number(req.params.limit))))
                    error.push('limit param should be a number');
        if(req.params.rank)
            result = rank.find(val => val == req.params.rank);
            if(!result) error.push(`rank mush be one of ${rank}`);

        if(req.params.order)
            if(req.params.order.toUpperCase() != 'ASC' && req.params.order.toUpperCase() != 'DESC')
                error.push("order must be either 'ASC' or 'DESC'");
        
        if (error.length == 0) return next();
        res.status(403).send({
            sucess: false,
            message: 'validation error',
            error: error
        });
    }
}
const movieValidationMiddleware = new MovieValidationMiddleware();
export { movieValidationMiddleware };