const mongoose = require ('mongoose')

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL) 
    console.log(`MongoDB connected to ${db.connection.name}!!`)
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}

connectDB()

