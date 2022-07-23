import { v4 } from 'uuid';
import { ResolverContext } from '../../typings';
import { MutationResponse, OnBoardingData } from '../resolvertypes';

export async function onBoard(
    _: any,
    args: OnBoardingData,
    { request, prisma }: ResolverContext
): Promise<MutationResponse> {
    try {
        const diseases = args.diseases.map((d) => ({
            diseaseId: d.diseasesId,
            userId: request.session.userId,
            types: d.selectedTypes,
        }));

        await prisma.diseases.createMany({
            data: diseases,
        });

        await prisma.diet.create({
            data: {
                dietId: v4(),
                userId: request.session.userId,
            },
        });

        return { error: null, success: true };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, success: false };
    }
}
