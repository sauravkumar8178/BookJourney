import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            reqired: true,
        },
        author: {
            type: String,
            reqired: true,
        },
        publishYear: {
            type: Number,
            reqired: true,
        },
    },
    {
        timestamps: true,
    }
    );

export const book = mongoose.model('Cat', bookSchema);