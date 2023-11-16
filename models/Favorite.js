import { Schema, model } from 'mongoose'

const favoriteSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  favoriteProducts: [
    {
      type: Schema.ObjectId,
      ref: "Product",
    }

  ],
}, {
  versionKey: false

});

export default model("Favorite", favoriteSchema);
