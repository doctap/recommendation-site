import { Client } from 'pg';
import { IResponseDB } from '../types/data-contracts';

const client = new Client({
	password: "root",
	user: "root",
	host: "postgres",
});

export async function sqlRequest<T = any>(sql: string) {
	const r: IResponseDB<T> = { body: [], error: false };
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