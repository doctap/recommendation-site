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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlRequest = void 0;
const pg_1 = require("pg");
const client = new pg_1.Client({
    password: "toor",
    user: "toor",
    host: "localhost", // "postgres"
});
function sqlRequest(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        const r = { body: null, error: false };
        yield client
            .query(sql)
            .then(p => r.body = p.rows)
            .catch(e => {
            console.error(e);
            r.error = true;
        });
        return r;
    });
}
exports.sqlRequest = sqlRequest;
(() => __awaiter(void 0, void 0, void 0, function* () { return yield client.connect().catch(e => console.error(e)); }))();
//# sourceMappingURL=requests-db.js.map