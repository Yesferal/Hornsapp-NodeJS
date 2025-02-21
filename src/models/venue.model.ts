import mongoose, { Schema, Document } from 'mongoose';

export interface IVenue extends Document {
    name: String,
    description: String
}

const VenueSchema = new Schema({
    name: { type: String },
    displayName: {
        en: { type: String },
        es: { type: String }
    },
    descrption: { type: String, minlength: 1, maxlength: 350 },
    latitude: { type: Number },
    longitude: { type: Number },
    imageUrl: { type: String }
})

export const venueModel = mongoose.model<IVenue>('Venue', VenueSchema);