import { BaseError, DomainEntity } from '@christiangsn/templates_shared'
import * as dayjs from 'dayjs'

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
    verificationType: EnumVerificationType;
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
    return this.getValue().userId
  }

  public getVerificationCode(generatorCode: IDomainService<string> =  new RandomCodeDomainService()): string
  {
    return this.getValue().verificationCode ?? generatorCode.handler()
  }

  public getVerificationType(): EnumVerificationType
  {
    return this.getValue().verificationType
  }

  public getIsVerified(): boolean
  {
    return this.getValue()?.isVerify ?? false
  }

  public getExpiresAt(): number
  {
    return this.getValue()?.expiresAt ?? dayjs(new Date()).add(120, 'minutes').unix()
  }

  public isExpired()
  {
    return dayjs(new Date()).unix() > this.getExpiresAt()
  }
}
