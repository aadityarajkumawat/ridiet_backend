import { getDiseases } from './getDiseases';
import { getMyDiseases } from './getMyDiseases';
import { me } from './me';
import { onBoarded } from './onBoarded';

const resolvers = { me, getDiseases, getMyDiseases, onBoarded };

export type Queries = typeof resolvers;

export default resolvers;
