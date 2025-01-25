import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'
import { phone } from 'phone'

import { InvalidPhoneNumberError } from '../errors/invalidPhoneNumberError'

export class PhoneNumberValueObject extends ValueObjectEntity<{ value: string }>
{
  protected check(): null | BaseError 
  {
    const { isValid } = phone(this.getProps().value, {
      country: 'BR',
    })

    if (!isValid)
    {
      return new InvalidPhoneNumberError()
    }

    return null
  }

  public getValue(): string
  {
    return this.getProps().value
  }
    
}
