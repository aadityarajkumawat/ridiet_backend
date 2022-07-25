"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const constants_1 = require("../constants");
const RedisStore = connect_redis_1.default(express_session_1.default);
const redisClient = redis_1.default.createClient({ port: 6379, host: 'redisdb' });
const sessionStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
});
function sessionMiddleware(SECRET) {
    return express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: sessionStore,
        secret: SECRET,
        cookie: {
            maxAge: constants_1.$10_YEARS,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        resave: false,
    });
}
exports.sessionMiddleware = sessionMiddleware;
//# sourceMappingURL=session.js.map