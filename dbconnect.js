const mongoose = require('mongoose');

const connectDb = async() => {
    return mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}
module.exports = connectDb