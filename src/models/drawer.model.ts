import mongoose, { Schema, Document } from 'mongoose'

export interface IDrawer extends Document {
    screens: IType[],
    categories: IType[]
}

interface IType {
    key: string,
    title: ITitle
}

interface ITitle {
    en: string,
    es: string
}

const DrawerScheme: Schema = new Schema({
    screens: [{
        key: {
            type: String
        },
        title: {
            en: { type: String },
            es: { type: String }
        }
    }],
    categories: [{
        key: {
            type: String
        },
        title: {
            en: { type: String },
            es: { type: String }
        }
    }]
})

export const drawerModel = mongoose.model<IDrawer>('Drawer', DrawerScheme)
