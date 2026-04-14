import { resolveLanguagePreference } from '@shared/utils/language.util'
import { UserEntity } from '../../../domain/entities/user'
import { DateOfBirthValueObject } from '../../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../../domain/valuesObjects/phoneNumber.valueObject'
import { UserSchema } from '../schema/user-schema'

export class UserMapper
{
  public toUserEntity(user: UserSchema): UserEntity
  {
    return new UserEntity(
      {
        email: EmailValueObject.Create({ email: user.email }).getResult().getOutput().payload,
        password: PasswordValueObject.Create({ password: user.password, iv: user.cryptoIVPassword }).getResult().getOutput().payload,
        lang: resolveLanguagePreference(user.lang),
        phoneNumber: user.phoneNumber ? PhoneNumberValueObject.Create({ value: user.phoneNumber }).getResult().getOutput().payload : null,
        fullName: user.name,
        dateOfBirth: DateOfBirthValueObject.Create({ dateOfBirth: user.dateOfBirth }).getResult().getOutput().payload,
        gender: user.gender,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
      user.id
    )
  }

  public toUserSchema(user: UserEntity): UserSchema
  {
    const persistence = new UserSchema() 
    persistence.id = user.getID()
    persistence.email = user.getEmail().getValue("email")
    persistence.password = user.getPassword().getValue("password")
    persistence.name = user.getFullName()
    persistence.phoneNumber = user.getPhoneNumber()?.getValue("value") ?? null
    persistence.dateOfBirth = user.getDateOfBirth().getValue("dateOfBirth")
    persistence.lang = user.getLang()
    persistence.gender = user.getGender()
    persistence.isVerified = user.getIsVerified()
    persistence.isActive = user.getIsActive()
    persistence.cryptoIVPassword = user.getPassword().getIVAsHex()
        
    return persistence
  }
}
