"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    password: { type: String, required: false },
    employeeId: { type: String, required: false },
});
exports.default = mongoose_1.model('user', userSchema);
