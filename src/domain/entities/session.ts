import { BaseError, DomainEntity } from '@christiangsn/templates_shared'

import type { ENumSignUpTypesLogin } from '../contracts/signup-types-login'
import { CryptoDomainService } from '../services/crypto/crypto.domain-service'
import type { IDomainService } from '../services/random-code/random-code.domain-service'
import { DictionariesDomain } from '@domain/responses/dictionaries'

export type IUserSession = 
{
    userId: string
    tokenAssociated: string
    SystemAssociated: ENumSignUpTypesLogin
    userAgent: string
    ipAddress: string
}

export class SessionEntity extends DomainEntity<IUserSession, DictionariesDomain.TDictionariesDomainErrors>
{
  private token: string = ''
  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
  {
    return null
  }

  public generateNewToken(tokenService: IDomainService<string> = new CryptoDomainService(this.getProps().userId))
  {
    this.token = tokenService.handler()
  }

  public getToken()
  {
    return this.token
  }

  public getTokenAssociated()
  {
    return this.token
  }

  public getUserId()
  {
    return this.getProps().userId
  }

  public getSystemAssociated()
  {
    return this.getProps().SystemAssociated
  }

  public getUserAgent()
  {
    return this.getProps().userAgent
  }

  public getIpAddress()
  {
    return this.getProps().ipAddress
  }
    
}
