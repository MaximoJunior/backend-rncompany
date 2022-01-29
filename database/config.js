const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log("Data Base online...");
    } catch (error) {
        console.log("Error - dbConnection :", error );
        throw new Error('Failed to connect Data Base');
    }
}

module.exports = {
    dbConnection
}