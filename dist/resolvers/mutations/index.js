"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("./login");
const register_1 = require("./register");
const addDiseases_1 = require("./addDiseases");
const logout_1 = require("./logout");
const onBoard_1 = require("./onBoard");
const resolvers = { login: login_1.login, register: register_1.register, addDiseases: addDiseases_1.addDiseases, logout: logout_1.logout, onBoard: onBoard_1.onBoard };
exports.default = resolvers;
//# sourceMappingURL=index.js.map