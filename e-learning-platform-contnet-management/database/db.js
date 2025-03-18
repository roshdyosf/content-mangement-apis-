const mongoose = require('mongoose')

const URl = process.env.CONNECTION_STRING

const connectToDB = async () => {
    try {
        await mongoose.connect(URl, { family: 4 })
        console.log('mongo db connected successfully ');

    } catch (error) {
        console.log('failed to connect to mongodb', error);
        process.exit(1)
    }
}
module.exports = connectToDB