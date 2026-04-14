import { InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

@InjectDTO<GetUserInformationDTO>()
export class GetUserInformationDTO extends DTOEntity
{
  @isRequired()
  @isString()
  public token!: string
}
