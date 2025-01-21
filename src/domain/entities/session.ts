import { BaseError, DomainEntity } from "@christiangsn/templates_shared"
import type { ENumSignUpTypesLogin } from "../contracts/signup-types-login"
import type { IDomainService } from "../services/random-code/random-code.domain-service"
import { CryptoDomainService } from "../services/crypto/crypto.domain-service"

type IUserSession = 
{
    userId: string
    tokenAssociated: string
    SystemAssociated: ENumSignUpTypesLogin
    userAgent: string
    ipAddress: string
}

export class SessionEntity extends DomainEntity<IUserSession>
{
    private readonly token: string = ''
    protected check(): null | BaseError 
    {
        throw new Error("Method not implemented.")
    }

    public generateNewToken(tokenService: IDomainService<string> = new CryptoDomainService(this.getValue().userId))
    {
        return tokenService.handler()
    }

    public getToken()
    {
        return this.token
    }
}