import { WebSocketServer } from 'ws';


let state = { slide: 0, pluggedIn: false }
let connections = []


const wss = new WebSocketServer({ port: 1234 });

wss.on('connection', function connection(ws) {
  connections.push(ws);

  ws.on('error', console.error);

  ws.on("close", () => {
    connections = connections.filter(conn => {
      if (conn === ws) {
        return false;
      }
      return true;
    })
  });

  ws.on('message', function message(data) {
    try {
      const update = JSON.parse(data);
      state = update
      connections.forEach(conn => {
        conn.send(JSON.stringify(state))
      })
    } catch (err) {
      console.log(err)
    }
  });

  ws.send(JSON.stringify(state));
});
