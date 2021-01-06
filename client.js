const net = require('net');
const client = net.createConnection({ port: 8080 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('new message frient\n');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.write('new message from client\n');
});

client.write('new message\n');
