import { Client } from 'pg';
import { IResponseDB } from '../types/data-contracts';

const client = new Client({
	password: "toor",
	user: "toor",
	host: "localhost",// "postgres"
});

export async function sqlRequest(sql: string) {
	const r: IResponseDB = { body: null, error: false };
	await client
		.query(sql)
		.then(p => r.body = p.rows)
		.catch(e => {
			console.error(e);
			r.error = true;
		});
	return r;
}

(async () => await client.connect().catch(e => console.error(e)))();