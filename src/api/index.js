const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require('body-parser')

const ws = require('ws');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 3002});
//Wire its handlers
wss.on('connection', function (ws) {
	//Show the connection has been established in the console
	console.log("\nWS Connection established:");
	console.log(ws.upgradeReq.headers);
	
	ws.send(JSON.stringify({greeting: "Hello"}));
	//Wire the event handlers
	ws.on('message', function (data) {
		var message = JSON.parse(data);
		console.log("\nWS Message received from client:");
		console.log(message);
		
		//Let the client know something was received
		var messageback = {
			source: "WebAppsNodeJs Application (server)",
			port: 3002,
			message: "Client Message Received!"
		}
		ws.send(JSON.stringify(messageback));
	});
});

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
	// For Karma
	//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9876')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}))

const mockResponse = '{"greeting":"Hello"}'
// predefined url
const defaultURLs = '{"urls": [{"id":"1","value":"ws://localhost:3002", "desc": "check connection"}]}'

app.get('/api/status', (req, res) => {
	res.json(mockResponse)
})

app.get('/api/urls', (req, res) => {
	res.json(defaultURLs)
})


app.listen(port)
