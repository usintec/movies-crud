import express from 'express';
const HomeRouter = express.Router();
/**
 * Add routes to UserRouter
 */
HomeRouter.get('/', (req, res) => {
        res.status(200).send({
            sucess: true,
            message: 'Our API is up and runnig'
        });
    });
export { HomeRouter };