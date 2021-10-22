import User from './user.modal';
import Hackathon from './hackathon.modal'
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from '../../environments/env';

export class UserController {


    static async signup(req, res, next) {
        let d = req.body;
        try {
            let user: any = {}
            let newUser = new User(JSON.parse(JSON.stringify(d)));
            user = await newUser.save();
            let status = {
                message: "Employee Registered Successfully."
            };
            user = { ...status, user };
            res.send(user);

        } catch (error) {
            console.log('error', error);
            next(error);
        }
    }

    static async login(req, res, next) {
        let d = req.body;
        const employeeId = d.employeeId;
        const password = d.password;
        const user = req.user;

        try {
            if (password.trim() != user.password.trim()) {
                throw new Error('Employee Id & Password Does Not Match')
            }
            const data = { _id: user._id, employeeId: user.employeeId }
            const token = Jwt.sign(data, getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
            const response = { user: user, token: token };
            res.json(response)
        } catch (e) {
            next(e);
        }

    }


    static async createHackathon(req, res, next) {
        let d = req.body;
        d['empId'] = req.user._id;
        try {
            let newClient = new Hackathon(d);
            let idea = await newClient.save();
            res.send({ ...{ message: "Hackathon Idea added successfully" }, idea, });

        } catch (error) {
            next(error);
        }
    }


    static async hackathonIdeaList(req, res, next) {
        const user = req.user;
        try {
            let idea: any = await Hackathon.find().populate(['upVote', 'empId']);
            let hackIdea: any[] = []
            if (idea) {
                hackIdea = idea
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
                }
            });

            res.send({ hackIdea, message: "Hackathon Idea list" });

        } catch (error) {
            next(error);
        }
    }


    static async upvote(req, res, next) {
        const user = req.user;
        let d = req.body;
        try {

            const isUpvoteExist: any = await Hackathon.findOne({ _id: d.hackId, upVote: { $in: [user._id] } });
            let isHackIdea;
            if (!isUpvoteExist) {
                isHackIdea = await Hackathon.findByIdAndUpdate({ _id: d.hackId }, { $push: { upVote: [user._id] } }, { new: true });
                console.log('push', isUpvoteExist)
            } else {
                isHackIdea = await Hackathon.findByIdAndUpdate({ _id: d.hackId }, { $pull: { upVote: user._id } }, { new: true });
                console.log('pull', isUpvoteExist)
            }

            res.send({ data: isHackIdea, message: "Upvote Update Successfully" });

        } catch (error) {
            next(error);
        }
    }


}