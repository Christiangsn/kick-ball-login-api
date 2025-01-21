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
