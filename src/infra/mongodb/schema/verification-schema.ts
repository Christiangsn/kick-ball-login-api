import { field, required, schemaDef } from 'mongoose-decorators-ts'

import { EnumVerificationType, type VerificationProps } from '../../../domain/entities/verifications'

@schemaDef({
  name: 'verifications'
})
export class VerificationSchema implements VerificationProps
{
  @required({ type: String, index: true })
  public userId!: string

  @field({ type: String, index: true, nullable: true })
  public verificationCode?: string

  @field({ type: String, enum: EnumVerificationType,  index: true, nullable: true })
  public verificationType?: EnumVerificationType

  @required({ type: Boolean, index: true, nullable: true })
  public isVerify!: boolean

  @required({ type: Number, index: true })
  public expiresAt!: number
}
