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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiseases = void 0;
const argon2_1 = __importDefault(require("argon2"));
function addDiseases(_, args, { request, prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findFirst({
                where: { email: args.email },
            });
            if (!user)
                return { error: 'User does not exist', user: null };
            const passwordIsValid = yield argon2_1.default.verify(user.password, args.password);
            if (!passwordIsValid)
                return { error: 'Email or Password is incorrect', user: null };
            request.session.userId = user.userId;
            return { error: null, user };
        }
        catch (error) {
            console.log(error.message);
            return { error: error.message, user: null };
        }
    });
}
exports.addDiseases = addDiseases;
//# sourceMappingURL=addDisease.js.map