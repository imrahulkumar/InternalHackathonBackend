import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
  
        password: { type: String, required: false },
        employeeId: { type: String, required: false },

    }
);


export default model('user', userSchema);