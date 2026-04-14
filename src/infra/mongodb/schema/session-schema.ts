import { field, required, schemaDef } from 'mongoose-decorators-ts'

import type { ENumSignUpTypesLogin } from '../../../domain/contracts/signup-types-login'
import type { IUserSession } from '../../../domain/entities/session'

@schemaDef({
  name: 'sessions'
})
export class SessionSchema implements IUserSession
{
  @required({ type: String, index: true, unique: true })
  public sessionId!: string

  @required({ type: String, index: true })
  public userId!: string

  @required({ type: String, index: true })
  public tokenAssociated!: string

  @required({ type: String, index: true })
  public SystemAssociated!: ENumSignUpTypesLogin

  @required({ type: String, index: true })
  public userAgent!: string

  @required({ type: String, index: true })
  public ipAddress!: string

  @field({ type: Date, index: true, default: new Date().toISOString() })
  public createdAt!: Date

  @field({ type: Date, index: true, default: new Date().toISOString() })
  public updatedAt!: Date
}
