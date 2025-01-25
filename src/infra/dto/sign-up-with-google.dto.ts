import { InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

import type { SignUpWithGoogle } from '../../app/useCases/sign-up-with-google.useCase'

@InjectDTO<SignUpWithGoogle.IDTO>()
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
}
