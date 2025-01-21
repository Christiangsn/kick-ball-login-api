import { BaseSuccess, Result } from '@christiangsn/templates_shared'
import type { IResult, IUseCases } from '@christiangsn/templates_shared/build/interfaces'

import type { IUserRepository } from '../../domain/contracts/user-repo.contract'
import { EnumGender, UserEntity } from '../../domain/entities/user'
import { DateOfBirthValueObject } from '../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../domain/valuesObjects/phoneNumber.valueObject'

export type SignUpDTO =
{
    email: string;
    password: string;
    phoneNumber?: string;
    fullName: string;
    dateOfBirth: string;
    gender?: EnumGender;
}

export class SignUpUseCase implements IUseCases<SignUpDTO, { message: string | string[] }>
{
  public constructor (
    private readonly userRepository: IUserRepository,
  ) { }

  public async run(dto: SignUpDTO): Promise<Result<{ message: string | string[] }>>
  {
    const email = EmailValueObject.create({ value: dto.email })
    const password = PasswordValueObject.create({ value: dto.password })
    const dateOfBirth = DateOfBirthValueObject.create({ value: dto.dateOfBirth })

    const values = [email, password, dateOfBirth]
    for (const value of values) 
    {
      if (value.isFailure())
      {
        return Result.decline(value.errorValue())
      }
    }

    let phoneNumber: IResult<PhoneNumberValueObject> | undefined = undefined
    if (dto.phoneNumber)
    {
      phoneNumber = PhoneNumberValueObject.create({ value: dto.phoneNumber })
      if (phoneNumber.isFailure())
      {
        return Result.decline(phoneNumber.errorValue())
      }
    }

    const newUser = UserEntity.create(
      {
        dateOfBirth: dateOfBirth.getResult(),
        email: email.getResult(),
        password: password.getResult(),
        fullName: dto.fullName,
        phoneNumber: phoneNumber?.getResult() ?? null,
        gender: dto?.gender ?? null,
        isActive: false,
        isVerified: false
      }).getResult()

    await this.userRepository.save(newUser)

    return Result.success<{ message: string }>(new BaseSuccess({ message: 'User registered successfully' }))
  }
}
