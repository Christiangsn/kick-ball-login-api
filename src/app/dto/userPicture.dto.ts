import { InjectDTO, isRequired, isString } from '@christiangsn/templates_shared'
import { DTOEntity  } from '@christiangsn/templates_shared/build/common/baseDTO'

@InjectDTO<UserPictureDTO>()
export class UserPictureDTO extends DTOEntity
{
  @isRequired()
  @isString()
  public userId!: string

  @isRequired()
  public file!: {
    fieldname: string
    mimetype: string
    size: string
    buffer: Buffer
  }
}
