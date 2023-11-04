import { Schema, model } from 'mongoose'

const productSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)
export default model("Product", productSchema);
