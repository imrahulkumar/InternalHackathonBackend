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
const hackathon_modal_1 = require("./hackathon.modal");
const Jwt = require("jsonwebtoken");
const env_1 = require("../../environments/env");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            try {
                let user = {};
                let newUser = new user_modal_1.default(JSON.parse(JSON.stringify(d)));
                user = yield newUser.save();
                let status = {
                    message: "Employee Registered Successfully."
                };
                user = Object.assign(Object.assign({}, status), { user });
                res.send(user);
            }
            catch (error) {
                console.log('error', error);
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            const employeeId = d.employeeId;
            const password = d.password;
            const user = req.user;
            try {
                if (password.trim() != user.password.trim()) {
                    throw new Error('Employee Id & Password Does Not Match');
                }
                const data = { _id: user._id, employeeId: user.employeeId };
                const token = Jwt.sign(data, env_1.getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
                const response = { user: user, token: token };
                res.json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createHackathon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            d['empId'] = req.user._id;
            try {
                let newClient = new hackathon_modal_1.default(d);
                let idea = yield newClient.save();
                res.send(Object.assign({ message: "Hackathon Idea added successfully" }, { idea }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static hackathonIdeaList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                let idea = yield hackathon_modal_1.default.find().populate(['upVote', 'empId']);
                let hackIdea = [];
                if (idea) {
                    hackIdea = idea;
                }
                hackIdea = hackIdea.map(item => {
                    let bool = false;
                    if (item.upVote.length > 0) {
                        const isMatched = item.upVote.filter(d => d._id == user._id);
                        bool = isMatched.length > 0 ? true : false;
                    }
                    return {
                        isUpvote: bool,
                        item,
                    };
                });
                res.send({ hackIdea, message: "Hackathon Idea list" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static upvote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            let d = req.body;
            try {
                const isUpvoteExist = yield hackathon_modal_1.default.findOne({ _id: d.hackId, upVote: { $in: [user._id] } });
                let isHackIdea;
                if (!isUpvoteExist) {
                    isHackIdea = yield hackathon_modal_1.default.findByIdAndUpdate({ _id: d.hackId }, { $push: { upVote: [user._id] } }, { new: true });
                    console.log('push', isUpvoteExist);
                }
                else {
                    isHackIdea = yield hackathon_modal_1.default.findByIdAndUpdate({ _id: d.hackId }, { $pull: { upVote: user._id } }, { new: true });
                    console.log('pull', isUpvoteExist);
                }
                res.send({ data: isHackIdea, message: "Upvote Update Successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
