import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
    views: IType[]
}

interface IType {
    key: string,
    title: ITitle,
    subTitle: ITitle,
    imageUrl: string
}

interface ITitle {
    en: string,
    es: string
}

const ReviewScheme: Schema = new Schema({
    views: [{
        key: {
            type: String
        },
        title: {
            en: { type: String },
            es: { type: String }
        },
        subtitle: {
            en: { type: String },
            es: { type: String }
        },
        imageUrl: { type: String }
    }]
})

export const reviewModel = mongoose.model<IReview>('Review', ReviewScheme)