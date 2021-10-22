
import { body, query } from 'express-validator'
import User from './user.modal';

export class UserValidators {


    static signup() {
        return [
            body('employeeId', 'Employee Id is Required').isString()
                .custom((employeeId, { req }) => {
                    return User.findOne({ employeeId: employeeId }).then((user) => {
                        if (user) {
                            throw new Error('Employee Id Already Exist')
                        } else {
                            return true;
                        }
                    });
                }),
            body('password', 'Password is required').isString()
        ]
    }

    static login() {
        return [body('employeeId', 'Employee Id is required').isString().custom((employeeId, { req }) => {
            return User.findOne({ employeeId: employeeId }).then(user => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('Employee Does Not Exist');
                }
            })
        }),
        body('password', 'Password is Required').isString()]
    }

}


