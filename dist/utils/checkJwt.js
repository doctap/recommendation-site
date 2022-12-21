"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
exports.checkJwt = (0, express_jwt_1.expressjwt)({
    secret: 'cc0f5da250d9af55fa19a955d94915ca',
    // аудитория
    audience,
    // тот, кто подписал токен
    issuer: `https://${domain}/`,
    // алгоритм, использованный для подписания токена
    algorithms: ['RS256']
});
//# sourceMappingURL=checkJwt.js.map