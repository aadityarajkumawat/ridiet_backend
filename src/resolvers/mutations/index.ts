import { login } from './login';
import { register } from './register';
import { addDiseases } from './addDiseases';
import { logout } from './logout';
import { onBoard } from './onBoard';

const resolvers = { login, register, addDiseases, logout, onBoard };

export type Mutations = typeof resolvers;

export default resolvers;
