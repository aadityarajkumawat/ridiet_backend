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
require("dotenv-safe/config");
const graphql_yoga_1 = require("graphql-yoga");
const path_1 = __importDefault(require("path"));
const session_1 = require("./middlewares/session");
const resolvers_1 = __importDefault(require("./resolvers"));
const client_1 = require("@prisma/client");
const contextBuilder_1 = require("./helpers/contextBuilder");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const permissions = {
    Query: {
        me: authMiddleware_1.authMiddleware,
        onBoarded: authMiddleware_1.authMiddleware,
        getMyDiseases: authMiddleware_1.authMiddleware,
    },
    Mutation: {
        onBoard: authMiddleware_1.authMiddleware,
    },
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const typeDefs = path_1.default.join(__dirname, 'graphql/typeDefs.graphql');
        const resolvers = resolvers_1.default;
        const server = new graphql_yoga_1.GraphQLServer({
            typeDefs,
            resolvers: resolvers,
            context: (options) => contextBuilder_1.contextBuilder.build(options, { prisma: new client_1.PrismaClient() }),
            middlewares: [permissions],
        });
        server.express.use(session_1.sessionMiddleware(process.env.COOKIE_SECRET));
        server.start({ cors: { origin: '*' }, port: parseInt(process.env.PORT) }, (options) => {
            console.log(options);
            console.log(`Server running at port ${options.port}`);
        });
    });
}
main().catch((e) => console.log(e.message));
//# sourceMappingURL=index.js.map