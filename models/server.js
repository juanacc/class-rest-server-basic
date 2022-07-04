const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    // Database connection
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
