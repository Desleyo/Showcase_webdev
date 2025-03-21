const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    console.log("New client connected");

    ws.on("message", data => {
        console.log(`Data send: ${data}`);

        wss.broadcast(data);
    });
});

wss.broadcast = function (data) {
    wss.clients.forEach(client => client.send(JSON.stringify(data)));
 }