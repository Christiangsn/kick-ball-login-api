/* eslint-disable no-var */
import { BaseSuccess, Result } from '@christiangsn/templates_shared'
import type { IDTOValues, IResult, IUseCases } from '@christiangsn/templates_shared/build/interfaces'

import type { ISessionRepository } from '../../domain/contracts/session-repo.contract'
import type { ISignUpExternalRepository } from '../../domain/contracts/signup-external-repo.contract'
import { ENumSignUpTypesLogin } from '../../domain/contracts/signup-types-login'
import type { IUserRepository } from '../../domain/contracts/user-repo.contract'
import type { IVerificationRepository } from '../../domain/contracts/verification-repo.contract'
import { SessionEntity } from '../../domain/entities/session'
import { EnumGender, UserEntity } from '../../domain/entities/user'
import { EnumVerificationType, VerificationEntity } from '../../domain/entities/verifications'
import { DateOfBirthValueObject } from '../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../domain/valuesObjects/password.ValueObject'
import { InvalidTokenError } from '../errors/invalidTokenError'

export class SignUpWithGoogle implements IUseCases<SignUpWithGoogle.IDTO, { message: string, token: string }>
{
  public constructor (
    private readonly userRepository: IUserRepository,
    private readonly veriricationRepository: IVerificationRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly googleRepositoy: ISignUpExternalRepository<'google'>) 
  {
  }

  public async run (dto: IDTOValues<SignUpWithGoogle.IDTO>): Promise<IResult<{ message: string; token: string; }>>
  {
    const googleAccount = await this.googleRepositoy.getUserByToken(dto.idToken)
    if (!googleAccount)
    {
      return Result.decline(new InvalidTokenError('You token google is not authorized or not valid'))
    }

    const userAlreadyExists = await this.userRepository.findByEmail(googleAccount.email)
    if (userAlreadyExists) 
    {
      userAlreadyExists.setVerified()
      var newUser = userAlreadyExists
    } else {
      newUser = UserEntity.create({
        email: EmailValueObject.create({ value: googleAccount.email }).getResult(),
        password: PasswordValueObject.create({ value: 'password' }).getResult(),
        fullName: googleAccount.fullName,
        phoneNumber: null,
        dateOfBirth: DateOfBirthValueObject.create({ value: googleAccount.dateOfBirth }).getResult(),
        gender: EnumGender.Male,
        isVerified: true,
        isActive: true,
      }).getResult()

      await this.userRepository.save(newUser)
    }

    const verification = VerificationEntity.create({
      userId: newUser.getID(),
      verificationType: EnumVerificationType.Email,
      isVerify: newUser.getIsVerified(),
      expiresAt: googleAccount.expiresDate
    }).getResult()
    await this.veriricationRepository.save(verification)

    const session = SessionEntity.create({
      userId: newUser.getID(),
      tokenAssociated: dto.idToken,
      SystemAssociated: ENumSignUpTypesLogin.GOOGLE,
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

export namespace SignUpWithGoogle {
    export type IDTO = 
    {
      idToken: string;
      userAgent: string;
      ipAddress: string;
    }
}
