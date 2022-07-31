const mqtt = require('mqtt');

const host = '161.97.109.172'; //'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_client`;

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId/*, 
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000*/
});

function publish(topic, msg) {
  console.log(`Publish: ${topic}: ${msg}`);

  if (client.connected == true) {
    client.publish(topic, msg);
  }
}

let pubTimeSlots = {}

const topicUserAdd = 'user_add';
const topicUserDel = 'user_del';

const topic = ['user1', 'user2'];

client.on('connect', function() {
  console.log('connected ' + client.connected);

  client.publish(topicUserAdd, topic[0], {qos: 2, retain: false}, (err) => {
    if (err)
      console.log(`Error: ${topic[0]}, ${err}`);
    else 
      console.log(`Published ${topic[0]}`);
  });

  client.publish(topicUserAdd, topic[1], {qos: 2, retain: false}, (err) => {
    if (err)
      console.log(`Error: ${topic[1]}, ${err}`);
    else
      console.log(`Published ${topic[1]}`);
  })

  client.subscribe(topic, () => {
    console.log(`Subscribed to ${topic}`);
  });

  setTimeout(function() {
    client.publish(topicUserDel, topic[0]);
    client.publish(topicUserDel, topic[1]);
  }, 15000);

});

client.on('message', function(topic, message, packet) {
  console.log(`message: ${topic}, ${message}`);
});

client.on('error', function(error) {
  console.log('can not connect' + error);
  process.exit(1);
});

