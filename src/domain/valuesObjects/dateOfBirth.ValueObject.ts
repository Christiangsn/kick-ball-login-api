import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'

import { InvalidDateOfBirthError } from '../errors/invalidDateOfBirthError'

type ValueObjectEntityProps = {
    value: string;
}

export class DateOfBirthValueObject extends ValueObjectEntity<ValueObjectEntityProps>
{
  protected check(): null | BaseError
  {
    if (!this.getProps().value.match(/^\d{4}-\d{2}-\d{2}$/))
    {
      return new InvalidDateOfBirthError()
    }

    return null
  }

  public getValue(): string
  {
    return this.getProps().value
  }
}
