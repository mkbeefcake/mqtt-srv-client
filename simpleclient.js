const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.emqx.io:1883', {
  clientId: 'hhhh',
});

client.on('connect', function () {
  console.log('connected ' + client.connected);
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', '1111');
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(`Received:  ${topic}, ${message}`);
  client.end()
})