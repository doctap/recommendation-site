"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
// const corsOptions: CorsOptions = {
// 	credentials: true,
// 	optionsSuccessStatus: 200,
// 	origin: ['http://localhost:3000'],
// 	methods: ['GET', 'POST', 'DELETE'],
// }
// app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('The sedulous hyena atcsdcsdce the antelope!');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map