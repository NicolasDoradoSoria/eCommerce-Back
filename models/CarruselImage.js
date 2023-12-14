import {Schema, model} from 'mongoose'

const carruselImageSchema = Schema({
    public_id: {
        type: String,
        required: true,
        trim: true,
    },
    secure_url: {
        type: String,
        required: true,
        trim: true,
    },
   
}, {timestamps: true});

export default model("Carrousel", carruselImageSchema);