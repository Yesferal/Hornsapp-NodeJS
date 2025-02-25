import mongoose, { Schema, Document } from 'mongoose'

export interface IConcert extends Document {
    name: String,
    description: String
}

const ConcertSchema: Schema = new Schema({
    name: {
        en: { type: String, require: true },
        es: { type: String, require: true }
    },
    about: {
        en: { type: String },
        es: { type: String }
    },
    dateTime: { type: Date },
    posterImage: { type: String, require: true },
    ticketing: {
        name: { type: String },
        url: { type: String }
    },
    links: [{
        key: {
            type: String
        },
        name: {
            en: { type: String },
            es: { type: String }
        },
        icon: { type: String },
        url: { type: String }
    }],
    tags: [{ type: String }],
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    state: { type: Schema.Types.ObjectId, ref: 'State', require: true },
    bands: [{ type: Schema.Types.ObjectId, ref: 'Band', require: true }]
})

export const concertModel = mongoose.model<IConcert>('Concert', ConcertSchema)