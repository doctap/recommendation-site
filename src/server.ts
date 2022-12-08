import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import cors, { CorsOptions } from 'cors';
import { Client } from 'pg';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8080;

const client = new Client({
	password: "root",
	user: "root",
	host: "postgres",
});

app.use(express.static("public"));

app.get("/employees", async (req, res) => {
	const results = await client
	.query("SELECT * FROM Users")
	.then((payload) => {
		return payload.rows;
	})
	.catch((e) => {
		console.error(e, 'request')
		throw new Error("Query failed");
	});
	res.setHeader("Content-Type", "application/json");
	res.status(200);
	res.send(JSON.stringify(results));
});


(async () => {
	await client.connect().catch(e => console.error(e, 'connect'));
 
	app.listen(port, () => {
	  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
	});
 })();