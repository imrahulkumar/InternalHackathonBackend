"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const CheckError_1 = require("../../middleware/CheckError");
const user_validators_1 = require("./user.validators");
const hackathon_validator_1 = require("./hackathon.validator");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        // Get hackathon List
        this.router.get('/hackathon-list', CheckError_1.GlobalCheckErrorMiddleWare.authentication, user_controller_1.UserController.hackathonIdeaList);
        this.router.post('/upvote', CheckError_1.GlobalCheckErrorMiddleWare.authentication, user_controller_1.UserController.upvote);
    }
    postRoutes() {
        // SIGN UP Done
        this.router.post('/signup', user_validators_1.UserValidators.signup(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, user_controller_1.UserController.signup);
        // LOGIN Done
        this.router.post('/login', user_validators_1.UserValidators.login(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, user_controller_1.UserController.login);
        // Create Hackathon    
        this.router.post('/add/hackathon', CheckError_1.GlobalCheckErrorMiddleWare.authentication, hackathon_validator_1.HackathonValidators.hackathon(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, user_controller_1.UserController.createHackathon);
    }
    patchRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
