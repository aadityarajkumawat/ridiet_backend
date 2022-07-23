import { v4 } from 'uuid';
import { ResolverContext } from '../../typings';
import { AddDiseasesArgs, MutationResponse } from '../resolvertypes';

export async function addDiseases(
    _: any,
    args: AddDiseasesArgs,
    { prisma }: ResolverContext
): Promise<MutationResponse> {
    try {
        await prisma.diseasesCollection.create({
            data: {
                diseasesId: v4(),
                ...args,
            },
        });

        return { error: null, success: true };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, success: false };
    }
}
