import { BaseError, DomainEntity } from '@christiangsn/templates_shared'
import dayjs from 'dayjs'

import { RandomCodeDomainService, type IDomainService } from '../services/random-code/random-code.domain-service'

export enum EnumVerificationType
{
    Email = 'Email',
    Phone = 'Phone'
}

export type VerificationProps =
{
  userId: string;
  verificationCode?: string;
  verificationType?: EnumVerificationType;
  isVerify?: boolean;
  expiresAt?: number;
}

export class VerificationEntity extends DomainEntity<VerificationProps> 
{
  protected check(): null | BaseError
  {
    return null
  }

  public getUserId(): string
  {
    return this.getProps().userId
  }

  public getVerificationCode(generatorCode: IDomainService<string> =  new RandomCodeDomainService()): string
  {
    return this.getProps().verificationCode ?? generatorCode.handler()
  }

  public getVerificationType(): EnumVerificationType
  {
    return this.getProps().verificationType
  }

  public getIsVerified(): boolean
  {
    return this.getProps()?.isVerify ?? false
  }

  public getExpiresAt(): number
  {
    return this.getProps()?.expiresAt ?? dayjs(new Date()).add(120, 'minutes').unix()
  }

  public isExpired()
  {
    return dayjs(new Date()).unix() > this.getExpiresAt()
  }
}
