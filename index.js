const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (requisicao, resposta) => {
  resposta.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Alguem se conectou com o id " + socket.id);
});

function geravalor() {
  return (Math.random() * 100).toFixed(2);
}

setInterval(() => {
  io.emit("cotação", geravalor());
}, 1000);

server.listen(3000, () => {
  console.log("Ouvindo na porta 3000");
});

// Problema com o CORS
// https://stackoverflow.com/questions/44628363/socket-io-access-control-allow-origin-error/64805972