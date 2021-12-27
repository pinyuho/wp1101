const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws)
}

const broadcastMessage = (data, status, wss) => {
    wss.clients.forEach((client) => {
      sendData(data, client);
      sendStatus(status, client);
    });
};

const broadcastStatus = (status, wss) => {
  wss.clients.forEach((client) => {
    sendStatus(status, client);
  });
};

export { broadcastMessage, broadcastStatus }