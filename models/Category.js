import {Schema, model} from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  path: {
    type: String,
    trim: true,
  }
}, {
  versionKey: false
});

export default model("Category", CategorySchema);