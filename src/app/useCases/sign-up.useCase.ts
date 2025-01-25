import { BaseSuccess, Result } from '@christiangsn/templates_shared'
import type { IDTOValues, IResult, IUseCases } from '@christiangsn/templates_shared/build/interfaces'

import type { ISessionRepository } from '../../domain/contracts/session-repo.contract'
import { ENumSignUpTypesLogin } from '../../domain/contracts/signup-types-login'
import type { IUserRepository } from '../../domain/contracts/user-repo.contract'
import type { IVerificationRepository } from '../../domain/contracts/verification-repo.contract'
import { SessionEntity } from '../../domain/entities/session'
import { EnumGender, UserEntity } from '../../domain/entities/user'
import { VerificationEntity } from '../../domain/entities/verifications'
import { DateOfBirthValueObject } from '../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../domain/valuesObjects/phoneNumber.valueObject'

export class SignUpUseCase implements IUseCases<SignUpUseCase.DTO, { message: string, token: string }>
{
  public constructor (
    private readonly veriricationRepository: IVerificationRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly userRepository: IUserRepository,
  ) { }

  public async run(dto: IDTOValues<SignUpUseCase.DTO>): Promise<Result<{ message: string, token: string }>>
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
    
    newUser.getPassword().encryptPassword()

    await this.userRepository.save(newUser)

    const verification = VerificationEntity.create({
      userId: newUser.getID(),
      verificationType: null,
      isVerify: newUser.getIsVerified(),
      expiresAt: null,
    }).getResult()
    await this.veriricationRepository.save(verification)

    const session = SessionEntity.create({
      userId: newUser.getID(),
      tokenAssociated: 'internal',
      SystemAssociated: ENumSignUpTypesLogin.INTERNAL,
      userAgent: dto.userAgent,
      ipAddress: dto.ipAddress
    }).getResult()
    session.generateNewToken()
    await this.sessionRepository.save(session)

    return Result.success<{ message: string; token: string }>(new BaseSuccess({ 
      message: 'User registered successfully', 
      token: session.getToken() 
    }))
  }
}

export namespace SignUpUseCase 
{
  export type DTO =
  {
    email: string;
    password: string;
    phoneNumber?: string;
    fullName: string;
    dateOfBirth: string;
    gender?: EnumGender;
    userAgent: string;
    ipAddress: string;
  }
}
