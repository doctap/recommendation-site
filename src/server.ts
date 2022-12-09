import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { IRequestById, IRequestByTwoId } from './types/data-contracts';
import { sqlRequestGET } from './db/requests-db';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 5000; // 8080
const urlencodedParser = express.urlencoded({ extended: false });

const corsOptions: CorsOptions = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'DELETE'],
}

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
	const r = await sqlRequestGET(
		`SELECT * FROM Users;`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(r.body));
	}
});

app.get("/reviews", async (req: Request<any, any, any, IRequestById>, res) => {
	const r = await sqlRequestGET(
		`SELECT * FROM Reviews WHERE id >=${req.query.skip} AND id <=${req.query.take};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(r.body));
	}
});

app.get("/comments", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
	const r = await sqlRequestGET(
		`SELECT * FROM Comments WHERE userId =${req.query.userId} AND reviewId =${req.query.reviewId};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(r.body));
	}
});

app.get("/user_ratings", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
	const r = await sqlRequestGET(
		`SELECT * FROM UserRatings WHERE userId =${req.query.userId} AND reviewId =${req.query.reviewId};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(r.body));
	}
});

app.get("/user_role", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
	const r = await sqlRequestGET(
		`SELECT * FROM UserRoles WHERE userId =${req.query.userId};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(r.body));
	}
});

// app.post('/registration', urlencodedParser, (req, res) => {
// 	const usersId = req.body.usersId;
// 	if (!req.body)
// 		return res.sendStatus(400);
// 	if (usersId.length > 0) {
// 		client.query(`UPDATE Users SET isBlocked=0 WHERE id in (${usersId.join()})`)
// 			.then(() => client.query(`SELECT * FROM Users`))
// 			.then(r => res.send(r))
// 			.catch(e => console.log(e.message))
// 	}
// });

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});