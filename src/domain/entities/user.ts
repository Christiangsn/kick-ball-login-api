import { BaseError, DomainEntity } from '@christiangsn/templates_shared'

import { DateOfBirthValueObject } from '../valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../valuesObjects/phoneNumber.valueObject'

export enum EnumGender
{
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
    PreferNotToSay = 'Prefer not to say'
}

export type UserEntityProps =
{
    email: EmailValueObject;
    password: PasswordValueObject;
    phoneNumber: PhoneNumberValueObject | null;
    fullName: string;
    dateOfBirth: DateOfBirthValueObject;
    gender: EnumGender | null;
    isVerified: boolean;
    isActive: boolean;
}

export class UserEntity extends DomainEntity<UserEntityProps>
{
  protected check(): null | BaseError 
  {
    return null
  }
    
  public setVerified(): void
  {
    this.getValue().isVerified = true
  }

  public getGender(): EnumGender
  {
    return this.getValue()?.gender ?? EnumGender.PreferNotToSay
  }

  public getIsVerified(): boolean
  {
    return this.getValue()?.isVerified ?? false
  }

  public getIsActive(): boolean
  {
    return this.getValue()?.isActive?? true
  }

  public getPassword(): PasswordValueObject
  {
    return this.getValue().password
  }

  public getPhoneNumber(): PhoneNumberValueObject | null
  {
    return this.getValue()?.phoneNumber ?? null
  }

  public getFullName(): string
  {
    return this.getValue()?.fullName
  }

  public getEmail(): EmailValueObject
  {
    return this.getValue()?.email
  }

  public getDateOfBirth(): DateOfBirthValueObject
  {
    return this.getValue()?.dateOfBirth
  }

}
