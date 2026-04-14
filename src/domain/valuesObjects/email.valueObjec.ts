import { BaseError, Languages, ValueObjectEntity } from '@christiangsn/templates_shared'

import { DictionariesDomain } from '@domain/responses/dictionaries';

import { DomainErrors } from '@domain/responses/errors';

export type EmailValueObjectEntityProps = {
  email: string
};

export class EmailValueObject extends ValueObjectEntity<EmailValueObjectEntityProps, DictionariesDomain.TDictionariesDomainErrors>
{
  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
  {
    if (!this.getValue<string>('email').match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))
    {
      const lang: Languages.LanguageValues = this.getValue('lang') ?? Languages.enUS.value
      
      return new DomainErrors.InvalidEmailError(
        "Invalid email format",
        "The e-mail informed is invalid",
        lang
      )
    }
    return null
  }

}
