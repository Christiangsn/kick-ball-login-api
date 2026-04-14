import { InjectDTO, isEnumerable, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

import type { SignUpUseCase } from '../../app/useCases/login/sign-up.useCase'
import { EnumGender } from '../../domain/entities/user'
import { AcceptTermsUseCase } from '@app/useCases/user/accept-terms.useCase'

@InjectDTO<SignUpUseCase.DTO>()
export class SignUpDTO extends DTOEntity implements SignUpUseCase.DTO
{
  @isRequired()
  public terms!: Omit<AcceptTermsUseCase.DTO, 'userId'>
  
  @isRequired()
  @isString()
  public email!: string

  @isRequired()
  @isString()
  public password!: string

  @isRequired()
  @isString()
  public ipAddress!: string

  @isString()
  public phoneNumber?: string

  @isRequired()
  @isString()
  public fullName: string

  @isEnumerable(EnumGender)
  public gender?: EnumGender

  @isRequired()
  @isString()
  public dateOfBirth: string

  @isRequired()
  public userAgent!: string
}
