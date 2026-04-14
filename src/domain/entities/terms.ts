import { BaseError, DomainEntity, ILanguages } from '@christiangsn/templates_shared'
import { DictionariesDomain } from '@domain/responses/dictionaries'

type ITermsAccess = {
  accepted: boolean
  version: string
  acceptAt: Date
  ip: string
}

export type ITermsProps = {
  userId: string,
  terms: ITermsAccess[]
}

export class TermsEntity extends DomainEntity<ITermsProps, DictionariesDomain.TDictionariesDomainErrors> 
{
  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors> 
  {
    return null
  }

  public getLang(): ILanguages.LanguageValues
  {
    return this.getProps().lang ?? ILanguages.LanguageValues.EN_US
  }

  public getUserId(): string
  {
    return this.getProps().userId
  }
  public getTerm()
  {
    return this.getProps().terms
  }
}
