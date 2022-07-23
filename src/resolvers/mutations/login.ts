import { ResolverContext } from '../../typings';
import { LoginInput, UserResponse } from '../resolvertypes';
import argon2 from 'argon2';

export async function login(
    _: any,
    args: LoginInput,
    { request, prisma }: ResolverContext
): Promise<UserResponse> {
    try {
        const user = await prisma.user.findFirst({
            where: { email: args.email },
        });
        if (!user) throw new Error('user-not-found');

        const passwordIsValid = await argon2.verify(
            user.password,
            args.password
        );

        if (!passwordIsValid)
            return { error: 'Email or Password is incorrect', user: null };

        request.session.userId = user.userId;
        return { error: null, user };
    } catch (error) {
        console.log(error.message);
        return { error: error.message, user: null };
    }
}
