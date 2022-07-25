"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDiseases_1 = require("./getDiseases");
const getMyDiseases_1 = require("./getMyDiseases");
const me_1 = require("./me");
const onBoarded_1 = require("./onBoarded");
const resolvers = { me: me_1.me, getDiseases: getDiseases_1.getDiseases, getMyDiseases: getMyDiseases_1.getMyDiseases, onBoarded: onBoarded_1.onBoarded };
exports.default = resolvers;
//# sourceMappingURL=index.js.map