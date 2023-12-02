import { Schema, model } from 'mongoose'

const optionSchema = Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Referencia al producto
    attributes: Schema.Types.Mixed
}, {
    versionKey: false,
    strict: false,
});

export default model("Options", optionSchema);
