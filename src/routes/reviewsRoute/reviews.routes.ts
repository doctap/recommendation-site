import express, { Router, Request, Response } from 'express'
import { sqlRequest } from '../../db/requests-db';
import { IRequestSlice, IBody } from '../../types/data-contracts';
import { checkJwt } from '../../utils/checkJwt'

const router = Router()
const urlencodedParser = express.urlencoded({ extended: false });

// router.get('/reviews', (req, res) => {
// 	res.status(200).json({ message: 'reviews' })
//   })


// router.post("/reviews", urlencodedParser, async (req: ITypedRequestBody<IRequestSlice>, res: Response) => {

// 	console.log(req.body)
// 	// console.log(req.body.skip, req.body.take)
// 	// const r = await sqlRequest(
// 	// 	`SELECT * FROM Reviews WHERE id >=${req.body.skip} AND id <=${req.body.skip + req.body.take};`
// 	// );
// 	// if (r.error) {
// 	// 	res.sendStatus(501)
// 	// } else {
// 	// 	res.setHeader("Content-Type", "application/json").status(200).json(r.body);
// 	// }
// });

// router.get('/protected', checkJwt, (req, res) => {
// 	res.status(200).json({ message: 'Protected message' })
// })

export default router