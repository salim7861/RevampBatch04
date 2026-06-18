const express = require('express');
const dotenv = require('dotenv');

const env = process.argv[2] || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();

function log(message) {
    const time = new Date().toISOString();
    console.log(`[${time}] [${env.toUpperCase()}] ${message}`);
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

app.listen(PORT, () => {
    log("Server is running on port " + PORT);
});

