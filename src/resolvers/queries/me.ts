import { ResolverContext } from 'src/typings';
import { UserResponse } from '../resolvertypes';

export async function me(
    _: any,
    __: any,
    { prisma, request }: ResolverContext
): Promise<UserResponse> {
    if (!request.session.userId) {
        return { error: 'User not authenticated', user: null };
    }
    try {
        const user = await prisma.user.findFirst({
            where: { userId: request.session.userId },
        });

        if (!user) return { error: 'User not found', user };

        console.log('hit', user);
        return { error: null, user };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, user: null };
    }
}
