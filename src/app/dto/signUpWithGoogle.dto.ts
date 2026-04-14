import { ILanguages, InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
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

  @isString()
  public lang!: ILanguages.LanguageValues
}
