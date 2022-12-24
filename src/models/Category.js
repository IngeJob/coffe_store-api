const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { 
      type: String, 
      required: true,
      unique: true,
      trim: true,
    },
    image: { 
      type: String, 
      required: true 
    },
    listProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.model('Category', CategorySchema)