import { ResolverContext } from 'src/typings';

export async function onBoarded(
    _: any,
    __: any,
    { prisma, request }: ResolverContext
): Promise<boolean> {
    try {
        const res = await prisma.diet.count({
            where: { userId: request.session.userId },
        });

        return res > 0;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
