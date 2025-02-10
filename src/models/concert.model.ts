import mongoose, { Schema, Document } from 'mongoose'

export interface IConcert extends Document {
    name: String,
    description: String
}

const ConcertSchema: Schema = new Schema({
    name: { type: String, require: true, minlength: 1, maxlength: 100 },
    about: {
        en: { type: String },
        es: { type: String }
    },
    dateTime: { type: Date },
    images: {
        headliner: { type: String, require: true },
        poster: { type: String }
    },
    ticketing: {
        name: { type: String },
        url: { type: String }
    },
    trailer: {
        image: { type: String },
        url: { type: String }
    },
    links: [{
        name: { type: String },
        url: { type: String }
    }],
    tags: [{ type: String }],
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    state: { type: Schema.Types.ObjectId, ref: 'State', require: true },
    bands: [{ type: Schema.Types.ObjectId, ref: 'Band', require: true }]
})

export const concertModel = mongoose.model<IConcert>('Concert', ConcertSchema)