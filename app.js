const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const env = process.argv[2] || "development";
dotenv.config({ path: `.env.${env}` });
const logDir = '/app/logs';
const logFile = path.join(logDir, 'app.log');
const app = express();
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true});
}

function log(message) {
    const time = new Date().toISOString();
    const finalMessage = `[${time}] [${env.toUpperCase()}] ${message}`;
    fs.appendFileSync(logFile, finalMessage + '\n');
}

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP;

app.get('/', (req, res) => {
    res.send('Hello world from ' + APP_NAME);
});

app.get('/health' , (req, res) => {
	log("health check been called");
	res.status(200).json({
		status:"up"
	});

});

app.post('/webhook',(req, res) => {
	console.log("webhook received:");
	console.log(req.body);
	res.status(200).send("received");
});
app.listen(PORT, () => {
    log("Server is running on port " + PORT);
});

