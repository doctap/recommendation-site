import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { IRequestSlice, IBody, ReviewId, ILike, IUser, IResponseDB, IResponseRegister, IReview, IUserData, IRate } from './types/data-contracts';
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


app.post("/reviews", urlencodedParser, async (req: IBody<IRequestSlice>, res: Response<IReview[]>) => {
	const body = req.body;

	console.log('reviews')// <==
	//==========================

	const r = await sqlRequest<IReview>(
		`SELECT *,
		(SELECT AVG(user_rating) AS average_rating FROM user_ratings WHERE review_id=reviews.id)
		FROM Reviews ORDER BY Id
		LIMIT ${body.take} OFFSET ${body.skip};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		r.body.forEach(it => it.average_rating = parseFloat(it.average_rating).toFixed(1))
		res.setHeader("Content-Type", "application/json").status(200).json(r.body);
	}
})

app.post("/protectedReviews", checkJwt, async (req: IBody<IRequestSlice & IUser & IUserData>, res: Response<IReview[]>) => {
	const body = req.body;

	console.log('protectedReviews')// <==
	//==========================

	const r = await sqlRequest<IReview>(
		`SELECT *,
		(SELECT AVG(user_rating) AS average_rating FROM user_ratings WHERE review_id=reviews.id),
		coalesce((SELECT review_like FROM user_ratings WHERE user_id = '${body?.sub}' AND review_id = Reviews.id), '0') AS user_likes_it,
		coalesce((SELECT user_rating FROM user_ratings WHERE user_id = '${body?.sub}' AND review_id = Reviews.id), '0') AS user_rating
		FROM Reviews ORDER BY Id
		LIMIT ${body.take} OFFSET ${body.skip};`
	);
	if (r.error) {
		res.sendStatus(501)
	} else {
		r.body.forEach(it => it.average_rating = parseFloat(it.average_rating).toFixed(1))
		res.setHeader("Content-Type", "application/json").status(200).json(r.body);
	}
})

app.post("/registerUser", checkJwt, async (req: IBody<IUser>, res: Response) => {
	const user = req.body;
	await sqlRequest(
		`SELECT count(id) as count FROM users WHERE id='${user.sub}';`
	).then(async (r) => {
		if (r.body[0].count === '0') {
			await sqlRequest(
				`INSERT INTO Users(first_name, last_name, id)
				VALUES('${user?.given_name}', '${user?.family_name}', '${user?.sub}');`
			).then(async () => {
				await sqlRequest(
					`SELECT count(id) as result FROM users WHERE id='${user.sub}';`
				).then(q => {
					res.sendStatus(204)
				})
			})
		} else if (r.body[0].count !== '0') {
			res.sendStatus(204)
		}
	});
})

app.post('/likeReview', checkJwt, async (req: IBody<ILike>, res) => {
	const body = req.body;
	await sqlRequest(
		`SELECT count(user_id) as count FROM user_ratings WHERE user_id='${body?.sub}' AND review_id= ${body.review_id};`
	).then(async (c) => {
		if (c.body[0].count !== '0') {
			await sqlRequest(
				`UPDATE user_ratings
				SET review_like = ${body.user_likes_it ? 'true' : 'false'}
				WHERE review_id = ${body.review_id} AND user_id = '${body?.sub}';
				`
			).then(() => res.sendStatus(204)).catch(() => res.sendStatus(501))
		}
		else if (c.body[0].count === '0') {
			await sqlRequest(
				`INSERT INTO user_ratings (user_id, review_id, review_like)
				VALUES ('${body.sub}', ${body.review_id}, ${body.user_likes_it ? 'true' : 'false'});
				`
			).then(() => res.sendStatus(204)).catch(() => res.sendStatus(501))
		}
	})
})

app.post('/giveRating', checkJwt, async (req: IBody<IRate>, res) => {
	const body = req.body;
	console.log(body)
	await sqlRequest(
		`SELECT count(user_id) as count FROM user_ratings WHERE user_id='${body?.sub}' AND review_id= ${body.review_id};`
	).then(async (c) => {
		if (c.body[0].count !== '0') {
			await sqlRequest(
				`UPDATE user_ratings
				SET user_rating = ${body.user_rating}
				WHERE review_id = ${body.review_id} AND user_id = '${body?.sub}';
				`
			).then(() => res.sendStatus(204)).catch(() => res.sendStatus(501))
		}
		else if (c.body[0].count === '0') {
			await sqlRequest(
				`INSERT INTO user_ratings (user_id, review_id, user_rating)
				VALUES ('${body.sub}', ${body.review_id}, ${body.user_rating});
				`
			).then(() => res.sendStatus(204)).catch(() => res.sendStatus(501))
		}
	})
})

app.use('*', (req, res) => {
	res.status(400).json({ message: 'Only api endpoint available' })
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port} 🚀`);
});