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
// import bodyParser from 'body-parser';
// import cors, { CorsOptions } from 'cors';
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
const client = new pg_1.Client({
    password: "root",
    user: "root",
    host: "postgres",
});
app.use(express_1.default.static("public"));
app.get("/employees", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield client
        .query("SELECT * FROM Users")
        .then((payload) => {
        return payload.rows;
    })
        .catch((e) => {
        console.error(e, 'request');
        throw new Error("Query failed");
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect().catch(e => console.error(e, 'connect'));
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}))();
//# sourceMappingURL=server.js.map