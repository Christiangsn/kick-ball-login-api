import { UserEntity } from "../../../domain/entities/user";
import { DateOfBirthValueObject } from "../../../domain/valuesObjects/dateOfBirth.ValueObject";
import { EmailValueObject } from "../../../domain/valuesObjects/email.valueObjec";
import { PasswordValueObject } from "../../../domain/valuesObjects/password.ValueObject";
import { PhoneNumberValueObject } from "../../../domain/valuesObjects/phoneNumber.valueObject";
import { UserSchema } from "../schema/user-schema";

export class UserMapper
{
    public toUserEntity(user: UserSchema): UserEntity
    {
        return new UserEntity(
            {
                email: EmailValueObject.create({ value: user.email }).getResult(),
                password: PasswordValueObject.create({ value: user.password }).getResult(),
                phoneNumber: user.phoneNumber ? PhoneNumberValueObject.create({ value: user.phoneNumber }).getResult() : null,
                fullName: user.name,
                dateOfBirth: DateOfBirthValueObject.create({ value: user.dateOfBirth }).getResult(),
                gender: user.gender,
                isVerified: user.isVerified,
                isActive: user.isActive,
            }
        )
    }

    public toUserSchema(user: UserEntity): UserSchema
    {
        const persistence = new UserSchema() 
        persistence.id = user.getID()
        persistence.email = user.getEmail().getValue()
        persistence.password = user.getPassword().getValue()
        persistence.name = user.getFullName()
        persistence.phoneNumber = user.getPhoneNumber()?.getValue() ?? null
        persistence.dateOfBirth = user.getDateOfBirth().getValue()
        persistence.gender = user.getGender()
        persistence.isVerified = user.getIsVerified()
        persistence.isActive = user.getIsActive()
        persistence.createdAt = user.createAt()
        persistence.updatedAt = user.updateAt()
        
        return persistence;
    }
}