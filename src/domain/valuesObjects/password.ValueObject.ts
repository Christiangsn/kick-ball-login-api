import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'

import { InvalidPasswordError } from '../errors/invalidPasswordError'

export class PasswordValueObject extends ValueObjectEntity<{ value: string }>
{
  protected check(): null | BaseError 
  {
    const pass = this.getProps().value.length
    if (pass < 8)
    {
      return new InvalidPasswordError('Password must have at least 8 characters')
    }

    if (!/[A-Z]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one special character')
    }

    return null
  }

  public getValue(): string
  {
    return this.getProps().value
  }
}
