import { schemaDef, required, unique, field, dateField, ModelFromSchemaDef } from "mongoose-decorators-ts";
import { EnumGender } from "../../../domain/entities/user";
import { connection, Connection } from "mongoose";

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
    public name!: string

    @field({ type: String, unique: false, })
    public phoneNumber?: string | null

    @required({ type: String })
    public dateOfBirth!: string

    @field({ type: EnumGender, enum: EnumGender, default: EnumGender.PreferNotToSay  })
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

// export function getModel(conn: Connection = connection) {
//     return ModelFromSchemaDef<typeof UserSchema, UserSchema>(UserSchema, conn);
// }