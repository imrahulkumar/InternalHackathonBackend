"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const CheckError_1 = require("../../middleware/CheckError");
const user_validators_1 = require("./user.validators");
const staff_validator_1 = require("../staff/staff.validator");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        // Get User List
        this.router.get('/staff', CheckError_1.GlobalCheckErrorMiddleWare.authentication, user_controller_1.UserController.staff);
    }
    postRoutes() {
        // SIGN UP Done
        this.router.post('/signup', 
        // UserValidators.signup(),
        // GlobalCheckErrorMiddleWare.checkError,
        user_controller_1.UserController.signup);
        // LOGIN Done
        this.router.post('/login', user_validators_1.UserValidators.login(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, user_controller_1.UserController.login);
        this.router.post('/add/staff', CheckError_1.GlobalCheckErrorMiddleWare.authentication, staff_validator_1.StaffValidators.staff(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, user_controller_1.UserController.addStaff);
    }
    patchRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
