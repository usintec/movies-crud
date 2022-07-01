
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
        if(!req.params.keyword) error.push('keyword can not be empty');

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
}
const movieValidationMiddleware = new MovieValidationMiddleware();
export { movieValidationMiddleware };