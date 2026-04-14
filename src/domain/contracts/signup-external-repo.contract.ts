import { ENumSignUpTypesLogin } from "./signup-types-login";

export interface ISignUpExternalRepository<referenceName = string>
{
    getUserByToken (tokenId: string): Promise<{
        email: string;
        fullName: string;
        phoneNumber: string;
        dateOfBirth: string;
        expiresDate: number;
        referenceName: referenceName;
    } | null>
}

export namespace ISignUpExternalRepository {
    export type ReferenceName = keyof typeof ENumSignUpTypesLogin;
    export type IGetUserByTokenResponse = {
        email: string; 
        fullName: string;
        phoneNumber: string; 
        dateOfBirth: string; 
        expiresDate: number; 
        referenceName: "google"; 
    }
}