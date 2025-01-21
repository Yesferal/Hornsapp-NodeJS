import mongoose, { Schema, Document } from 'mongoose'
import { IConcert } from './concert.model'

export interface IBand extends Document {
    name: String,
    logoImage: String,
    membersImage: String,
    formerIn: Number,
    concerts: IConcert['_id']
}

const BandSchema: Schema = new Schema({
    name: { type: String, require: true, minlength: 1, maxlength: 50 },
    images: {
        logo: { type: String, require: true },
        members: { type: String, require: true }
    },
    about: {
        en: { type: String },
        es: { type: String }
    },
    country: {
        en: { type: String },
        es: { type: String }
    },
    formerIn: { type: Number },
    genres: [{ type: String }],
    concerts: [{ type: Schema.Types.ObjectId, ref: 'Concert', require: true }]
})

export const bandModel = mongoose.model<IBand>('Band', BandSchema)