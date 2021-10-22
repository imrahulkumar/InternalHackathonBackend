"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackathonValidators = void 0;
const express_validator_1 = require("express-validator");
class HackathonValidators {
    static hackathon() {
        return [
            express_validator_1.body('title', 'Title is required').isString(),
            express_validator_1.body('description', 'Description is Required').isString(),
            express_validator_1.body('tech', 'Tech is required').isString()
        ];
    }
}
exports.HackathonValidators = HackathonValidators;
