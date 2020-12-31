
import { body, query } from 'express-validator'
import User from './user.modal';

export class UserValidators {


    static signup() {
        return [
            body('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                    return User.findOne({ email: email }).then((user) => {
                        if (user) {
                            throw new Error('User Already Exist')
                        } else {
                            return true;
                        }
                    });
                }),
            body('name', 'Name is required').isString(),
            body('mobile', 'Mobile is required').isString()
                .isLength({ min: 0, max: 10 }).withMessage('Enter Valid Mobile No of 10 Digits'),
            body('password', 'Password is required').isString()
        ]
    }

    static login() {
        return [body('email', 'Email is required').isEmail().custom((email, { req }) => {
            return User.findOne({ email: email }).then(user => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                }
            })
        }),
        body('password', 'Password is Required').isString()]
    }

}


