"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const user_modal_1 = require("./user.modal");
class UserValidators {
    static signup() {
        return [
            express_validator_1.body('employeeId', 'Employee Id is Required').isString()
                .custom((employeeId, { req }) => {
                console.log('req req', req.body);
                return user_modal_1.default.findOne({ employeeId: employeeId }).then((user) => {
                    if (user) {
                        console.log('1');
                        throw new Error('Employee Id Already Exist');
                    }
                    else {
                        console.log('12');
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is required').isString()
        ];
    }
    static login() {
        return [express_validator_1.body('employeeId', 'Employee Id is required').isEmail().custom((employeeId, { req }) => {
                return user_modal_1.default.findOne({ employeeId: employeeId }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('Employee Does Not Exist');
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isString()];
    }
}
exports.UserValidators = UserValidators;
