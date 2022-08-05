import mongoose from 'mongoose'

mongoose
  .connect('mongodb://localhost:27017/bs')
  .then(() => {
    console.log('Mongodb Connected')
  })
  .catch((e) => {
    console.error('Mongodb Connect error ${e}')
  })

export default mongoose.connection
