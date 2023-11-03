import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        register: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)
export default model("User", userSchema);
