const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });
let cache = null;

wss.on("connection", ws => {
    console.log("New client connected");
    if (cache != null) {
        wss.broadcast(cache);
    }

    ws.on("message", data => {
        console.log(`Data send: ${data}`);
        cache = data;

        wss.broadcast(data);
    });
});

wss.broadcast = function (data) {
    wss.clients.forEach(client => client.send(JSON.stringify(data)));
 }