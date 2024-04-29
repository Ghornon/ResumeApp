import { SignInType } from './SignIn.types';

export type SignUpType = SignInType & {
    retype: string;
    firstName: string;
    lastName: string;
};
