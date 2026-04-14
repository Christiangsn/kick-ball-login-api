import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'
import { DictionariesDomain } from '@domain/responses/dictionaries';
import { DomainErrors } from '@domain/responses/errors';

type ValueObjectEntityProps = {
  dateOfBirth: string;
}

export class DateOfBirthValueObject extends ValueObjectEntity<ValueObjectEntityProps, DictionariesDomain.TDictionariesDomainErrors>
{
  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
  {
    if (!this.getValue<string>("dateOfBirth").match(/^\d{4}-\d{2}-\d{2}$/))
    {
      return new DomainErrors.InvalidDateFormatError(
        "Invalid date format",
        "The date of birth informed is invalid",
        this.getValue("lang")
      )
    }

    return null
  }

}
