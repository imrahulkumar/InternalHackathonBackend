"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_modal_1 = require("./user.modal");
const staff_modal_1 = require("../staff/staff.modal");
const Jwt = require("jsonwebtoken");
const env_1 = require("../../environments/env");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            console.log('hey');
            try {
                let user = {};
                let newUser = new user_modal_1.default(d);
                user = yield newUser.save();
                let status = {
                    message: "Employee Registered Successfully."
                };
                user = Object.assign(Object.assign({}, status), { user });
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            const email = d.email;
            const password = d.password;
            const user = req.user;
            try {
                if (password.trim() != user.password.trim()) {
                    throw new Error('Email & Password Does Not Match');
                }
                const data = { _id: user._id, email: user.email };
                const token = Jwt.sign(data, env_1.getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
                const response = { user: user, token: token };
                res.json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static addStaff(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            d['userId'] = req.user._id;
            try {
                let newClient = new staff_modal_1.default(d);
                let user = yield newClient.save();
                res.send(Object.assign({ message: "Staff added successfully" }, { user }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static staff(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                let staff = yield staff_modal_1.default.find({ userId: user._id });
                let staffList = [];
                if (staff) {
                    staffList = staff;
                }
                res.send({ staffList, message: "Staff list" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
