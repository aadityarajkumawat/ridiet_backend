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
exports.register = void 0;
const uuid_1 = require("uuid");
const argon2_1 = __importDefault(require("argon2"));
function register(_, args, { request, prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            args.userId = uuid_1.v4();
            const hashedPassword = yield argon2_1.default.hash(args.password);
            args.password = hashedPassword;
            const user = yield prisma.user.create({ data: Object.assign({}, args) });
            if (!user)
                return { error: 'Error while registering', user: null };
            request.session.userId = user.userId;
            return { error: null, user };
        }
        catch (error) {
            console.log(error.message);
            if (error.message.includes('email')) {
                return { error: 'This email is already taken', user: null };
            }
            return { error: error.message, user: null };
        }
    });
}
exports.register = register;
//# sourceMappingURL=register.js.map