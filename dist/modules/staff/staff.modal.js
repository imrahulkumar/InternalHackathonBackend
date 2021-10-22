"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    mobile: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' }
});
exports.default = mongoose_1.model('staff', staffSchema);
