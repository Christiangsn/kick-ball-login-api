import { InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

@InjectDTO<SignInDTO>()
export class SignInDTO extends DTOEntity
{
  @isRequired()
  @isString()
  public email!: string

  @isRequired()
  @isString()
  public password!: string

  @isRequired()
  @isString()
  public userAgent!: string

  @isRequired()
  @isString()
  public ipAddress!: string
}
