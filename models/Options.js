import { Schema, model } from 'mongoose'

const optionSchema = Schema({
    
}, {
    versionKey: false,
    strict: false,
});

export default model("Options", optionSchema);
