const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            priorities: '/api/priorities',
            tasks: '/api/tasks',
            users: '/api/users',
        }

        this.database();

        this.middlewares();

        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.priorities, require('../routes/priorities'));
        this.app.use(this.paths.tasks, require('../routes/tasks'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log( 'Server running at port', process.env.PORT );
        });
    }
}

module.exports = Server;