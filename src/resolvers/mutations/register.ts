import { ResolverContext } from '../../typings';
import { RegisterInput, UserResponse } from '../resolvertypes';
import { v4 } from 'uuid';
import argon2 from 'argon2';

export async function register(
    _: any,
    args: RegisterInput,
    { request, prisma }: ResolverContext
): Promise<UserResponse> {
    try {
        args.userId = v4();

        // hash password
        const hashedPassword = await argon2.hash(args.password);
        args.password = hashedPassword;

        const user = await prisma.user.create({ data: { ...args } });
        if (!user) return { error: 'Error while registering', user: null };

        request.session.userId = user.userId;
        return { error: null, user };
    } catch (error) {
        console.log(error.message);
        if (error.message.includes('email')) {
            return { error: 'This email is already taken', user: null };
        }
        return { error: error.message, user: null };
    }
}
