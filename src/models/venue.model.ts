import mongoose, { Schema, Document } from 'mongoose'

export interface IVenue extends Document {
    name: String,
    description: String
}

const VenueSchema = new Schema({
    name: {
        en: { type: String },
        es: { type: String }
    },
    descrption: {
        en: { type: String },
        es: { type: String }
    },
    mapSearchName: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    imageUrl: { type: String }
})

export const venueModel = mongoose.model<IVenue>('Venue', VenueSchema)