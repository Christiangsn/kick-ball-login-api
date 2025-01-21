import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'

import { InvalidEmailError } from '../errors/invalidEmailError'

type ValueObjectEntityProps = {
    value: string;
}

export class EmailValueObject extends ValueObjectEntity<ValueObjectEntityProps>
{
  protected check(): null | BaseError
  {
    if (!this.getProps().value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))
    {
      return new InvalidEmailError()
    }

    return null
  }

  public getValue(): string
  {
    return this.getProps().value
  }
}
