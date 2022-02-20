const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/usuarios',
        }

        this.middlewares();

        this.routes();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log( 'Servidor corriendo en puerto', process.env.PORT );
        });
    }
}

module.exports = Server;