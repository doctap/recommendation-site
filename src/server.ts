import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 5000;

const client = new Client({
	password: "root",
	user: "root",
	host: "localhost",
});

const corsOptions: CorsOptions = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'DELETE'],
}

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/employees", async (req, res) => {
	const results = await client
		.query("SELECT * FROM employees")
		.then((payload) => {
			return payload.rows;
		})
		.catch(() => {
			throw new Error("Query failed");
		});
	res.setHeader("Content-Type", "application/json");
	res.status(200);
	res.send(JSON.stringify(results));
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});