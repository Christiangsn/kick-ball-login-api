
import { Document, Model } from 'mongoose'

import type { IUserRepository } from '../../../domain/contracts/user-repo.contract'
import { UserEntity, EnumGender } from '../../../domain/entities/user'
import { DateOfBirthValueObject } from '../../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../../domain/valuesObjects/phoneNumber.valueObject'
import { UserMapper } from '../mappers/user.mapper'
import { UserSchema } from '../schema/user-schema'
import { IBasePersistenceFields } from '@christiangsn/templates_shared/build/interfaces/domain/IBaseRepository'

export class UserRepository implements IUserRepository
{
  public constructor (
      private readonly modelConn: Model<Document<UserSchema, any, any>>,
      private readonly mapper: UserMapper,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.modelConn.findOne<UserSchema>({ email: email.toLowerCase() })
    if (!user) return null
    return this.mapper.toUserEntity(user)
  }

  public async save(model: UserEntity): Promise<void> 
  {
    model.getPassword().encryptPassword()
    const user = this.mapper.toUserSchema(model)
    await new this.modelConn(user).save()
  }

  public async findOne(id: string): Promise<UserEntity | undefined> 
  {
    const user = await this.modelConn.findOne<UserSchema>({
      id
    })
    if (!user) return undefined
    return this.mapper.toUserEntity(user)
  }

  public async update(id: string, fields: IBasePersistenceFields<UserEntity>): Promise<void> {
    const updateFields: Partial<UserSchema> = {}

    if (fields.getGender) updateFields.gender = fields.getGender()
    if (fields.getIsVerified) updateFields.isVerified = fields.getIsVerified()
    if (fields.getIsActive) updateFields.isActive = fields.getIsActive()
    if (fields.getFullName) updateFields.name = fields.getFullName()
    if (fields.getEmail) updateFields.email = fields.getEmail().getValue("email")
    if (fields.getDateOfBirth) updateFields.dateOfBirth = fields.getDateOfBirth().getValue("dateOfBirth")
    if (fields.getPhoneNumber) updateFields.phoneNumber = fields.getPhoneNumber()?.getValue("value") ?? null
    if (fields.getPassword) {
      updateFields.password = fields.getPassword().getValue("password")
      updateFields.cryptoIVPassword = fields.getPassword().getIVAsHex()
    }

    if (Object.keys(updateFields).length === 0) return

    await this.modelConn.updateOne({ id }, { $set: updateFields })
  }
}
