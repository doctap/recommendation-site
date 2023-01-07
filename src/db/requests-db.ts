import { Client } from 'pg';
import { IResponseDB } from '../types/data-contracts';

const client = new Client({
	password: "fhQJLApGCFbsHb0AXhJ8OasEKVI2aJgn",
	user: "root",
	host: "dpg-cesjbug2i3mh51uqttf0-a",
});

export async function sqlRequest<T = any>(sql: string) {
	const r: IResponseDB<T> = { body: [], error: false };
	await client
		.query(sql)
		.then(p => r.body = p.rows)
		.catch(e => {
			r.error = true;
			throw new Error(e);
		});
	return r;
}

(async () => await client.connect().catch(e => console.error(e)))();