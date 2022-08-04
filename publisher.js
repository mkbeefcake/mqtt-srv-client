const mqtt = require('mqtt');

// const host = '161.97.109.172'; 
const host = 'broker.emqx.io';
const port = '8883';
const publisherId = `mqtt_publisher`;

const connectUrl = `mqtts://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
    publisherId/*, 
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

client.on('connect', function() {
    console.log('connected ' + client.connected);

    client.subscribe(topicUserAdd, () => {
        console.log(`Subscribed: ${topicUserAdd}`);
    });

    client.subscribe(topicUserDel, () => {
        console.log(`Subscribed: ${topicUserDel}`);
    });

});

client.on('message', function(userRole, buffer) {
    const topic = buffer.toString();
    if (userRole == topicUserAdd) {

    	console.log(`New topic is added : ${topic}`);
	    const timerId = setInterval(function() {
            const msg = Math.random().toString(16).substr(2,4);
            publish(topic, msg);
    	}, 5000);

	    pubTimeSlots[topic] = timerId;
    }
    else if (userRole == topicUserDel) {

        const timerId = pubTimeSlots[topic];
        if (timerId != undefined) {
            console.log(`Remove user: ${topic}, ${timerId}`);
            clearTimeout(timerId);
        }
    }

});

client.on('error', function(error) {
    console.log('can not connect' + error);
    process.exit(1);
});

