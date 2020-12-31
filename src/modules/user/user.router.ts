import { Router } from 'express';
import { UserController } from './user.controller';
import { GlobalCheckErrorMiddleWare } from '../../middleware/CheckError';
import { UserValidators } from './user.validators';
import { StaffValidators } from '../staff/staff.validator';

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

        // Get User List
        this.router.get('/staff',
            GlobalCheckErrorMiddleWare.authentication,
            UserController.staff);

    }
    postRoutes() {

        // SIGN UP 
        this.router.post('/signup',
            UserValidators.signup(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.signup);


        // LOGIN
        this.router.post('/login',
            UserValidators.login(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.login);

        this.router.post('/add/staff',
            GlobalCheckErrorMiddleWare.authentication,
            StaffValidators.staff(),
            GlobalCheckErrorMiddleWare.checkError,
            UserController.addStaff);

    }
    patchRoutes() { }
    deleteRoutes() { }

}

export default new UserRouter().router;