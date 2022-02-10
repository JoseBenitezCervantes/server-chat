const express = require("express");
const cors = require("cors");
const DBconection = require("../config/BD");
const chatController = require("../controllers/mensaje.controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    DBconection();
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    // Middlewares
    this.middlewares();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors({ origin: "*" }));
  }

  sockets() {
    this.io.on("connection", chatController(this.io))
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
