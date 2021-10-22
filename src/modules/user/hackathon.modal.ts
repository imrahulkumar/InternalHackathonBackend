import { date } from 'joi';
import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const hackathonSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        tech: { type: String, required: true },
        upVote: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
        empId: { type: mongoose.Types.ObjectId, ref:'user'},
        createdDate: {type: Date, default: new Date()}
    }
);


export default model('hackIdea', hackathonSchema);