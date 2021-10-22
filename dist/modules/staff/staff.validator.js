"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffValidators = void 0;
const express_validator_1 = require("express-validator");
class StaffValidators {
    static staff() {
        return [
            express_validator_1.body('name', 'Name is required').isString(),
            express_validator_1.body('designation', 'Designation is Required').isString(),
            express_validator_1.body('mobile', 'Mobile is required').isString()
        ];
    }
}
exports.StaffValidators = StaffValidators;
