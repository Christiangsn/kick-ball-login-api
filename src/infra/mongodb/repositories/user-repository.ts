
import { Document, Model } from 'mongoose'

import type { IUserRepository } from '../../../domain/contracts/user-repo.contract'
import { UserEntity, EnumGender } from '../../../domain/entities/user'
import { DateOfBirthValueObject } from '../../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../../domain/valuesObjects/phoneNumber.valueObject'
import { UserMapper } from '../mappers/user.mapper'
import { UserSchema } from '../schema/user-schema'

export class UserRepository implements IUserRepository
{
  public constructor (
        private readonly modelConn: Model<Document<UserSchema, any, any>>,
        private readonly mapper: UserMapper,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  public async save(model: UserEntity): Promise<void> 
  {
    const user = this.mapper.toUserSchema(model)
    await new this.modelConn(user).save()
  }

  public async findOne(id: string): Promise<UserEntity | undefined> 
  {
    const user = await this.modelConn.findById<UserSchema>(id)
    if (!user) return undefined
    return this.mapper.toUserEntity(user)
  }

  public async update(id: string, fields: Partial<{ getGender: () => EnumGender; getIsVerified: () => boolean; getIsActive: () => boolean; getPassword: () => PasswordValueObject; getPhoneNumber: () => PhoneNumberValueObject | null; getFullName: () => string; getEmail: () => EmailValueObject; getDateOfBirth: () => DateOfBirthValueObject; getID: () => string; createAt: () => Date; updateAt: () => Date; deleteAt: () => Date | null; }>): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
