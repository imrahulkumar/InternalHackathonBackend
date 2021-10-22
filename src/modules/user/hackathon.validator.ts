import { body, query } from 'express-validator';


export class HackathonValidators {
    static hackathon() {
        return [
            body('title', 'Title is required').isString(),
            body('description', 'Description is Required').isString(),         
            body('tech', 'Tech is required').isString()
        ]
    }
}