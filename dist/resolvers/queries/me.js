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
exports.me = void 0;
function me(_, __, { prisma, request }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.session.userId) {
            return { error: 'User not authenticated', user: null };
        }
        try {
            const user = yield prisma.user.findFirst({
                where: { userId: request.session.userId },
            });
            if (!user)
                return { error: 'User not found', user };
            console.log('hit', user);
            return { error: null, user };
        }
        catch (error) {
            console.log(error.message);
            return { error: error.message, user: null };
        }
    });
}
exports.me = me;
//# sourceMappingURL=me.js.map