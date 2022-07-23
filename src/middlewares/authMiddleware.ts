import { ResolverContext } from '../typings';

export const authMiddleware = async (
    resolve: () => Promise<any>,
    _: any,
    __: any,
    ctx: ResolverContext
) => {
    if (!ctx.request.session.userId) throw new Error('Unauthorized!');
    try {
        const res = await resolve();
        return res;
    } catch (e) {
        console.log(e);
    }
};
