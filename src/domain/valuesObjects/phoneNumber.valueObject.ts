import { BaseError, Languages, ValueObjectEntity } from '@christiangsn/templates_shared'
import { phone } from 'phone'
import { DictionariesDomain } from '@domain/responses/dictionaries';
import { DomainErrors } from '@domain/responses/errors';

export class PhoneNumberValueObject extends ValueObjectEntity<{ value: string; }, DictionariesDomain.TDictionariesDomainErrors>
{
  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
  {
    const { isValid } = phone(this.getValue('value'), {
      country: 'BR',
    })
    const lang = this.getValue('lang') as Languages.LanguageValues

    if (!isValid)
    {
      return new DomainErrors.InvalidPhoneNumberError(
        "Invalid phone number",
        "The phone number informed is invalid",
        lang
      )
    }

    return null
  }
    
}
