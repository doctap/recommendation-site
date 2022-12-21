"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const requests_db_1 = require("./db/requests-db");
const helmet_1 = __importDefault(require("helmet"));
const checkJwt_1 = require("./utils/checkJwt");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000; // 8080
const urlencodedParser = express_1.default.urlencoded({ extended: false });
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
};
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.post("/reviews", urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield (0, requests_db_1.sqlRequest)(`SELECT * FROM Reviews WHERE id>=${req.body.skip} AND id<${req.body.skip + req.body.take};`);
    if (r.error) {
        res.sendStatus(501);
    }
    else {
        res.setHeader("Content-Type", "application/json").status(200).json(r.body);
    }
}));
app.post('/likeReview', checkJwt_1.checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const r = req.body;
    // console.log(r)
    res.status(200).json({ message: req.body });
}));
app.use('*', (req, res) => {
    res.status(400).json({ message: 'Only api endpoint available' });
});
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
//# sourceMappingURL=server.js.map