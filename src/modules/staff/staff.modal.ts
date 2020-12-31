import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const staffSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        mobile: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, ref:'user'}
    }
);


export default model('staff', staffSchema);