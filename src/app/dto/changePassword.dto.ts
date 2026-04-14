import { ILanguages, InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

@InjectDTO<ChangePasswordDTO>()
export class ChangePasswordDTO extends DTOEntity
{
}
