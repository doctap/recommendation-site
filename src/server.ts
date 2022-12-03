import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 5000;

// const corsOptions: CorsOptions = {
// 	credentials: true,
// 	optionsSuccessStatus: 200,
// 	origin: ['http://localhost:3000'],
// 	methods: ['GET', 'POST', 'DELETE'],
// }

// app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});