import { ILanguages, InjectDTO, isEnumerable, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

@InjectDTO<SignUpWithGoogleDTO>()
export class SignUpWithGoogleDTO extends DTOEntity
{
  @isRequired()
  @isString()
  public idToken!: string

  @isRequired()
  @isString()
  public userAgent!: string

  @isRequired()
  @isString()
  public ipAddress!: string

  @isEnumerable(ILanguages.LanguageValues)
  public lang?: ILanguages.LanguageValues

  @isEnumerable(ILanguages.LanguageValues)
  public language?: ILanguages.LanguageValues
}
