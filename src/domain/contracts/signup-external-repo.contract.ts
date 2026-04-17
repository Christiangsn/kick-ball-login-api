import { ENumSignUpTypesLogin } from "./signup-types-login";

export interface ISignUpExternalRepository<referenceName = string>
{
    getUserByToken (tokenId: string, accessToken?: string): Promise<{
        email: string;
        fullName: string;
        phoneNumber: string | null;
        dateOfBirth: string | null;
        expiresDate: number;
        referenceName: referenceName;
    } | null>
}

export namespace ISignUpExternalRepository {
    export type ReferenceName = keyof typeof ENumSignUpTypesLogin;
    export type IGetUserByTokenResponse = {
        email: string; 
        fullName: string;
        phoneNumber: string | null; 
        dateOfBirth: string | null; 
        expiresDate: number; 
        referenceName: "google"; 
    }
}
