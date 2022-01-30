const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        // Change MONGODB_CNN to DEV_MONGODB_CNN for using a local DB
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