"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const router = (0, express_1.Router)();
const urlencodedParser = express_1.default.urlencoded({ extended: false });
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
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map