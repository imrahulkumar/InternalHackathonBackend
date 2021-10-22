import { Router } from 'express';
import { UserController } from './user.controller';
import { GlobalCheckErrorMiddleWare } from '../../middleware/CheckError';
import { UserValidators } from './user.validators';
import { HackathonValidators } from './hackathon.validator';

class UserRouter {

    public router: Router;


    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }


    getRoutes() {

        // Get hackathon List
        this.router.get('/hackathon-list',
            GlobalCheckErrorMiddleWare.authentication,
            UserController.hackathonIdeaList);

            this.router.post('/upvote',
            GlobalCheckErrorMiddleWare.authentication,
            UserController.upvote);

    }
    postRoutes() {

        // SIGN UP Done
        this.router.post('/signup',
            UserValidators.signup(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.signup);


        // LOGIN Done
        this.router.post('/login',
            UserValidators.login(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.login);

        // Create Hackathon    
        this.router.post('/add/hackathon',
            GlobalCheckErrorMiddleWare.authentication,
            HackathonValidators.hackathon(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.createHackathon);

    }
    patchRoutes() { }
    deleteRoutes() { }

}

export default new UserRouter().router;