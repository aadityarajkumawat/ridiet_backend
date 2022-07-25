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
exports.onBoard = void 0;
const uuid_1 = require("uuid");
function onBoard(_, args, { request, prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const diseases = args.diseases.map((d) => ({
                diseaseId: d.diseasesId,
                userId: request.session.userId,
                types: d.selectedTypes,
            }));
            yield prisma.diseases.createMany({
                data: diseases,
            });
            yield prisma.diet.create({
                data: {
                    dietId: uuid_1.v4(),
                    userId: request.session.userId,
                },
            });
            return { error: null, success: true };
        }
        catch (error) {
            console.log(error.message);
            return { error: error.message, success: false };
        }
    });
}
exports.onBoard = onBoard;
//# sourceMappingURL=onBoard.js.map