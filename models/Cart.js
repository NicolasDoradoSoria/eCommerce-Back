import { Schema, model } from 'mongoose'

const cartSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  products: [
    {
      id: {
        type: Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
      }
    }
  ],
  total: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  }

}, {
  versionKey: false

});

export default model("Cart", cartSchema);
