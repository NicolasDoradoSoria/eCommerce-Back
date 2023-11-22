import { Schema, model } from 'mongoose'

const optionSchema = Schema({
    name: {
        type: String,
        trim: true,
    },
}, {
    versionKey: false

});

export default model("Options", optionSchema);
