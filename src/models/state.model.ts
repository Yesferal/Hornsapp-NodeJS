import mongoose, { Schema, Document } from 'mongoose'

export interface IState extends Document {
    name: String,
    description: String
}

const StateShema = new Schema({
    name: {
        en: { type: String },
        es: { type: String }
    },
    descrption: {
        en: {
            type: String,
            maxlength: 200
        },
        es: {
            type: String,
            maxlength: 200
        }
    }
})

export const stateModel = mongoose.model<IState>('State', StateShema)