var grip = require('grip');
var faas_grip = require('faas-grip');
const AWS = require('aws-sdk');

exports.handler = function (event, context, callback) {
    // 2k padding for old browsers
    var padding = new Array(2048);
    var body = ':' + padding.join(' ') + '\n';

    callback({
        statusCode: 200,
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Grip-Hold': 'stream',
            'Grip-Channel': 'mychannel',
            'Grip-Keep-Alive': ':\\n\\n; format=cstring; timeout=20'
        },
        body: body
    });
}


exports.publishPlayerScoreEventsHandler = function (event, context, callback) {
    const eventStr = JSON.stringify(event);
    console.log("Got Players Table Event from stream : "+eventStr);
    const newImage = event.Records.map(record => record.dynamodb.NewImage);
    faas_grip.publish('test', new grip.HttpStreamFormat(
        'event: message\ndata: '+JSON.stringify(newImage)+'\n\n'));
    callback(null, "Successfully processed "+eventStr);
}

exports.publishTeamScoreEventsHandler = function (event, context, callback) {
    const eventStr = JSON.stringify(event);
    console.log("Got Teams Table Event from stream : "+eventStr);
    const newImage = event.Records.map(record => record.dynamodb.NewImage);
    faas_grip.publish('test', new grip.HttpStreamFormat(
        'event: message\ndata: '+JSON.stringify(newImage)+'\n\n'));
    callback(null, "Successfully processed "+eventStr);
}


