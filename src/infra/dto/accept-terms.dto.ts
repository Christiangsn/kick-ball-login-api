import { InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity } from '@christiangsn/templates_shared/build/common/baseDTO'
import { AcceptTermsUseCase } from '@app/useCases/user/accept-terms.useCase'

@InjectDTO<AcceptTermsUseCase.DTO>()
export class AcceptTermsDTO extends DTOEntity {
  @isRequired()
  public accepted!: boolean

  @isRequired()
  @isString()
  public version!: string

  @isRequired()
  @isString()
  public ipAddress!: string
}
