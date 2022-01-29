const cors = require("cors");
const express = require('express');

const { dbConnection } = require('../database/config');

 class Server {

    constructor() {

        this.app = express();

        this.middlewares();
        this.routes();

        this.connectDB()

    }

    routes() {
        
        this.app.use("/api/company", require("../routers/company") );
        this.app.use("/api/dgii", require("../routers/dgii") );

    }

    middlewares() {

        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );

    }

    async connectDB(){
          await dbConnection();
    }

    listen( port ) {

        this.app.listen( port, () => {
            console.log(`Server is runnig at http://localhost:${port}`);
        })

    }


}


module.exports = Server;