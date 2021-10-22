"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const hackathonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: String, required: true },
    upVote: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    empId: { type: mongoose.Types.ObjectId, ref: 'user' },
    createdDate: { type: Date, default: new Date() }
});
exports.default = mongoose_1.model('hackIdea', hackathonSchema);
