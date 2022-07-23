import { COOKIE_NAME } from '../../constants';
import { ResolverContext } from '../../typings';

export async function logout(
    _: any,
    __: any,
    { request, response }: ResolverContext
): Promise<boolean> {
    return new Promise((resolve) =>
        request.session.destroy((err) => {
            (response as any).clearCookie(COOKIE_NAME);

            if (err) {
                resolve(false);
                return;
            }

            resolve(true);
        })
    );
}
