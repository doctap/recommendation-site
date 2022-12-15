import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { IRequestSlice, IBody, ReviewId, ILike } from './types/data-contracts';
import { sqlRequest } from './db/requests-db';
import helmet from 'helmet';
import { checkJwt } from './utils/checkJwt';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000; // 8080
const urlencodedParser = express.urlencoded({ extended: false });

const corsOptions: CorsOptions = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'DELETE'],
}

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.static("public"));

app.use(bodyParser.json());


app.post("/reviews", urlencodedParser, async (req: IBody<IRequestSlice>, res: Response) => {
	const r = await sqlRequest(
		`SELECT * FROM Reviews WHERE id>=${req.body.skip} AND id<${req.body.skip + req.body.take};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		res.setHeader("Content-Type", "application/json").status(200).json(r.body);
	}
})

app.post('/likeReview', checkJwt, async (req: IBody<ILike>, res) => {
	// const r = req.body;
	// console.log(r)

	res.status(200).json({ message: req.body })
})




app.use('*', (req, res) => {
	res.status(400).json({ message: 'Only api endpoint available' })
})

// app.post("/reviews", async (req, res) => {

// const result = req.body;

// console.log(result);

// console.log('qwerty')
// const r = await sqlRequest(
// 	`SELECT * FROM Reviews WHERE id >=${req.body.skip} AND id <=${req.body.skip + req.body.take};`
// );
// if (r.error) {
// 	res.sendStatus(501)
// } else {
// 	res.setHeader("Content-Type", "application/json").status(200).json(r.body);
// }
// });

// app.get("/users", async (req, res) => {
// 	const r = await sqlRequestGET(
// 		`SELECT * FROM Users;`
// 	);
// 	if (r.error) {
// 		res.sendStatus(501)
// 	} else {
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(r.body));
// 	}
// });

// app.get("/reviews", async (req: Request<any, any, any, IRequestById>, res) => {
// 	const r = await sqlRequestGET(
// 		`SELECT * FROM Reviews WHERE id >=${req.query.skip} AND id <=${req.query.take};`
// 	);
// 	if (r.error) {
// 		res.sendStatus(501)
// 	} else {
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(r.body));
// 	}
// });

// app.get("/comments", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
// 	const r = await sqlRequestGET(
// 		`SELECT * FROM Comments WHERE userId =${req.query.userId} AND reviewId =${req.query.reviewId};`
// 	);
// 	if (r.error) {
// 		res.sendStatus(501)
// 	} else {
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(r.body));
// 	}
// });

// app.get("/user_ratings", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
// 	const r = await sqlRequestGET(
// 		`SELECT * FROM UserRatings WHERE userId =${req.query.userId} AND reviewId =${req.query.reviewId};`
// 	);
// 	if (r.error) {
// 		res.sendStatus(501)
// 	} else {
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(r.body));
// 	}
// });

// app.get("/user_role", async (req: Request<any, any, any, IRequestByTwoId>, res) => {
// 	const r = await sqlRequestGET(
// 		`SELECT * FROM UserRoles WHERE userId =${req.query.userId};`
// 	);
// 	if (r.error) {
// 		res.sendStatus(501)
// 	} else {
// 		res.setHeader("Content-Type", "application/json");
// 		res.status(200);
// 		res.send(JSON.stringify(r.body));
// 	}
// });

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
	console.log(`⚡️[server]: Server is running at https://localhost:${port} 🚀`);
});