const Mensaje = require("../schemas/mensajes");

const chatController = (io) => (socket) => {
  let nombre;
  const date = new Date();

  //Acciones cuando se conecta un usuario
  socket.on("conectado", async (nomb) => {
    nombre = nomb;

    //Se envian los mensajes anteriores
    const mensajes = await Mensaje.find();
    socket.emit("mensajesHistory", mensajes);
    
    //Cuando el usuario entra al chat se le infoma a los demas 
    socket.broadcast.emit("mensajes", {
      nombre: "Servidor",
      mensaje: `${nombre} se ha unido al chat!`,
      date,
    });
  });

  //Se envian y guardan los mensajes 
  socket.on("mensaje", async (nombre, mensajeClient) => {
    const mensaje = new Mensaje({ nombre, mensaje: mensajeClient, date });
    await mensaje.save(mensaje);
    io.emit("mensajes", { nombre, mensaje: mensajeClient, date });
  });

  //Se informa que un cliente se desconecto
  socket.on("disconnect", () => {
    socket.broadcast.emit("mensajes", {
      nombre: "Servidor",
      mensaje: `${nombre} ha abandonado el chat!`,
      date,
    });
  });
};

module.exports = chatController;
