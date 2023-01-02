const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    clientName: { 
      type: String, 
      required: true,
      trim: true,
    },
    clientReference: {
      type: String, 
      trim: true,
    },
    clientPhone: {
      type: String, 
      required: true,
      trim: true,
    },
    payMethod: {
      type: String, 
      required: true,
      trim: true,
    },
    clientLocation: {
      type: Array, 
      required: true,
      trim: true,
    },
    clientAddress: {
      type: String, 
      required: true,
      trim: true,
    },
    status:{
      type: String,
      default: 'Empaquetado'
    },
    orderList: [{
      amount: {
        type: Number, 
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    }],
    totalProducts: {
      type: Number, 
      required: true,
      trim: true,
    },
    finalPrice: {
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    deliveryman: {
      type: Schema.Types.ObjectId,
      ref: 'Deliveryman'
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.model('Order', OrderSchema)