import { ILanguages } from '@christiangsn/templates_shared/build/interfaces'
import { schemaDef, required, field, dateField } from 'mongoose-decorators-ts'

import { EnumGender } from '../../../domain/entities/user'

@schemaDef({
  name: 'users'
})
export class UserSchema
{
    @required({ type: String, unique: true, index: true })
  public id!: string

    @required({ type: String })
    public email!: string

    @required({ type: String })
    public password!: string

    @required({ type: String })
    public cryptoIVPassword!: string

    @required({ type: String })
    public name!: string

    @field({ type: String, unique: false, })
    public phoneNumber?: string | null

    @required({ type: String })
    public dateOfBirth!: string

    @field({ type: String, enum: ILanguages.LanguageValues, default: ILanguages.LanguageValues.PT_BR })
    public lang!: ILanguages.LanguageValues

    @field({ type: String, enum: EnumGender, default: EnumGender.PreferNotToSay  })
    public gender!: EnumGender

    @field({ type: Boolean, default: false })
    public isVerified!: boolean

    @field({ type: Boolean, default: true })
    public isActive!: boolean

    @dateField({ type: Date, default: Date.now })
    public createdAt?: Date

    @dateField({ type: Date, default: Date.now })
    public updatedAt?: Date
}
