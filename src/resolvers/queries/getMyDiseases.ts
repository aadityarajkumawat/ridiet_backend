import { ResolverContext } from 'src/typings';
import { QueryResponse } from '../resolvertypes';

export async function getMyDiseases(
    _: any,
    __: any,
    { prisma, request }: ResolverContext
): Promise<
    QueryResponse<
        Array<{ diseaseId: string; types: Array<string>; name: string }>
    >
> {
    try {
        const diseases = await prisma.diseases.findMany({
            where: { userId: request.session.userId },
        });

        function getTypesById(id: string) {
            for (let d of diseases) {
                if (d.diseaseId === id) {
                    return d.types;
                }
            }
            return [];
        }

        const dis: Array<{
            diseaseId: string;
            types: Array<string>;
            name: string;
        }> = [];

        const fetchReq = [];
        for (let disease of diseases) {
            fetchReq.push(
                prisma.diseasesCollection.findFirst({
                    where: { diseasesId: disease.diseaseId },
                })
            );
        }

        const res = await prisma.$transaction(fetchReq);

        if (res && res.length > 0) {
            for (let d of res) {
                if (!d) return { error: null, data: [] };
                dis.push({
                    diseaseId: d.diseasesId,
                    name: d.name,
                    types: getTypesById(d.diseasesId),
                });
            }
        }

        return { error: null, data: dis };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, data: [] };
    }
}
