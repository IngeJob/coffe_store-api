const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    fullname: {
      type: String, 
      required: true,
      trim: true,
    },
    username: {
      type: String, 
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true, 
      required: true,
    },
    password: {
      type: String, 
      required: true
    },
    phone: {
      type: String, 
      required: true
    },
    role: {
      type: String,
      required: true,
      default: 'USER'
    },
    code: {
      type: String, 
      required: true,
    },
    condition: {
      type: String,
      required: true,
      default: 'UNVERIFIED'
    },   
    avatar: {
      public_id: { 
        type: String,
        default: 'avatar/feychc6tliolxdiemvhd'
      }, 
      secure_url: { 
        type: String,
        default: 'https://res.cloudinary.com/dxb5m6akt/image/upload/v1671137302/avatar/feychc6tliolxdiemvhd.jpg'
      },
      userAvatar: {
        type: Boolean,
        default: false
      }  
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }]  
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
}

UserSchema.methods.matchPassword = async function (password){
  return await bcrypt.compare(password, this.password);
}

module.exports = model( 'User', UserSchema)