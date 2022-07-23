import { ResolverContext } from 'src/typings';
import { DiseasesResponse, QueryResponse } from '../resolvertypes';

export async function getDiseases(
    _: any,
    __: any,
    { prisma }: ResolverContext
): Promise<QueryResponse<DiseasesResponse>> {
    try {
        const diseases = await prisma.diseasesCollection.findMany();
        return { error: null, data: diseases };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, data: [] };
    }
}
