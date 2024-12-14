

import mongoose from "mongoose"

const connectionToDb = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
  } catch (error) {
    console.log(error)
  }
}

export default connectionToDb;