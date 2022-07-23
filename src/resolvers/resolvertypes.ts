import { DiseasesCollection, User } from '@prisma/client';

type Maybe<T> = T | null;

export interface UserResponse {
    error: string | null;
    user: Omit<User, 'password'> | null;
}

export interface MutationResponse {
    success: boolean;
    error: Maybe<string>;
}

export interface QueryResponse<T> {
    data: T;
    error: Maybe<string>;
}

// login resolver
export type LoginInput = Pick<User, 'email' | 'password'>;

// register resolver
export type RegisterInput = Omit<User, 'createdAt' | 'updatedAt'>;

// add diseases resolver
export type AddDiseasesArgs = { name: string; types: Array<string> };
export type DiseasesResponse = Array<DiseasesCollection>;

// onboard data resolver
export type OnBoardingData = {
    diseases: Array<{
        diseasesId: string;
        name: string;
        selectedTypes: Array<string>;
    }>;
    diet: string;
};
