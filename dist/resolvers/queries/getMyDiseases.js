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
exports.getMyDiseases = void 0;
function getMyDiseases(_, __, { prisma, request }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const diseases = yield prisma.diseases.findMany({
                where: { userId: request.session.userId },
            });
            function getTypesById(id) {
                for (let d of diseases) {
                    if (d.diseaseId === id) {
                        return d.types;
                    }
                }
                return [];
            }
            const dis = [];
            const fetchReq = [];
            for (let disease of diseases) {
                fetchReq.push(prisma.diseasesCollection.findFirst({
                    where: { diseasesId: disease.diseaseId },
                }));
            }
            const res = yield prisma.$transaction(fetchReq);
            if (res && res.length > 0) {
                for (let d of res) {
                    if (!d)
                        return { error: null, data: [] };
                    dis.push({
                        diseaseId: d.diseasesId,
                        name: d.name,
                        types: getTypesById(d.diseasesId),
                    });
                }
            }
            return { error: null, data: dis };
        }
        catch (error) {
            console.log(error.message);
            return { error: error.message, data: [] };
        }
    });
}
exports.getMyDiseases = getMyDiseases;
//# sourceMappingURL=getMyDiseases.js.map