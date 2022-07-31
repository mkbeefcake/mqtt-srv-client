var fs = require('fs');
var mqttServer = require('mqtt-server');

var servers = mqttServer({
    mqtt: 'tcp://161.97.109.172:1883',
    mqtts: 'ssl://161.97.109.172:8883',
    mqttws: 'ws://161.97.109.172:1884',
    mqtwss: 'wss://161.97.109.172:8884',
}, {
    /*ssl: {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt')
    },*/
    emitEvents: true // default
}, function(client) {
    console.log(`Fn : ${client}`);
	client.connack({
	    returnCode: 0
    });
});

servers.listen(function() {
    console.log('listening!');
});

