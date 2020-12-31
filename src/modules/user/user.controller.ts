import User from './user.modal';
import Staff from '../staff/staff.modal'
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from '../../environments/env';

export class UserController {


    static async signup(req, res, next) {
        let d = req.body;
        try {
            let user: any = {}
            let newUser = new User(d);
            user = await newUser.save();
            let status = {
                message: "User registered successfully"
            };
            user = { ...status, user };
            res.send(user);

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const user = req.user;

        try {
            if (password.trim() != user.password.trim()) {
                throw new Error('Email & Password Does Not Match')
            }
            const data = { _id: user._id, email: user.email }
            const token = Jwt.sign(data, getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
            const response = { user: user, token: token };
            res.json(response)
        } catch (e) {
            next(e);
        }

    }


    static async addStaff(req, res, next) {
        let d = req.body;
        d['userId'] = req.user._id;
        try {
            let newClient = new Staff(d);
            let user = await newClient.save();
            res.send({ ...{ message: "Staff added successfully" }, user, });

        } catch (error) {
            next(error);
        }
    }


    static async staff(req, res, next) {
        const user = req.user;
        try {
            let staff = await Staff.find({ userId: user._id })
            let staffList: any[] = []
            if (staff) {
                staffList = staff
            }
            res.send({ staffList, message: "Staff list" });

        } catch (error) {
            next(error);
        }
    }


}