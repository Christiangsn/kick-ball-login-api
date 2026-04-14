/* eslint-disable no-var */
import { SignUpWithGoogleDTO } from '@app/dto/signUpWithGoogle.dto';
import { ApplicationErrors } from '@app/errors/errors';
import { BaseSuccess, Result } from '@christiangsn/templates_shared'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices';
import type { IDTOValues } from '@christiangsn/templates_shared/build/interfaces'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult';
import { ENumSignUpTypesLogin, ISessionRepository, ISignUpExternalRepository, IUserRepository, IVerificationRepository } from '@domain/contracts';
import { EnumGender, EnumVerificationType, SessionEntity, UserEntity, VerificationEntity } from '@domain/entities';
import type { VerificationProps } from '@domain/entities';
import { DateOfBirthValueObject } from '@domain/valuesObjects/dateOfBirth.ValueObject';
import { EmailValueObject } from '@domain/valuesObjects/email.valueObjec';
import { PasswordValueObject } from '@domain/valuesObjects/password.ValueObject';
import { resolveLanguagePreference } from '@shared/utils/language.util';

export type SignUpWithGoogleInjectos = {
  readonly userRepository: IUserRepository,
  readonly veriricationRepository: IVerificationRepository,
  readonly sessionRepository: ISessionRepository,
  readonly googleRepositoy: ISignUpExternalRepository<'google'>
}

export namespace SignUpWithGoogle {
  export type Output = { message: string; token: string; }
}

export class SignUpWithGoogle extends TransferServices<SignUpWithGoogleInjectos> implements WithDependencies<SignUpWithGoogleInjectos> 
{

  declare readonly userRepository: IUserRepository;
  declare readonly veriricationRepository: IVerificationRepository;
  declare readonly sessionRepository: ISessionRepository;
  declare readonly googleRepositoy: ISignUpExternalRepository<'google'>;

  protected async execute (dto: IDTOValues<SignUpWithGoogleDTO>): Promise<IResult<SignUpWithGoogle.Output>>
  {
    const language = resolveLanguagePreference(dto.lang ?? dto.language)
    const googleAccount = await this.googleRepositoy.getUserByToken(dto.idToken)
    if (!googleAccount)
    {
      return Result.decline(new ApplicationErrors.InvalidGoogleTokenError("Your token google is not authorized or not valid", "The provided Google token is invalid or unauthorized.", language))
    }

    const userAlreadyExists = await this.userRepository.findByEmail(googleAccount.email)
    if (userAlreadyExists) 
    {
      userAlreadyExists.setVerified()
      var newUser = userAlreadyExists
    } else {
      const password = PasswordValueObject.Create(
        { password: `Google!${Date.now()}Aa1` },
        language
      ).getResult().getOutput().payload

      newUser = UserEntity.Create({
        email: EmailValueObject.Create({ email: googleAccount.email }).getResult().getOutput().payload,
        password,
        lang: language,
        fullName: googleAccount.fullName,
        phoneNumber: null,
        dateOfBirth: DateOfBirthValueObject.Create({ dateOfBirth: googleAccount.dateOfBirth }).getResult().getOutput().payload,
        gender: EnumGender.Male,
        isVerified: true,
        isActive: true,
      }).getResult().getOutput().payload;

      newUser.getPassword().encryptPassword()
      await this.userRepository.save(newUser)
    }

    const verificationProps: VerificationProps = {
      userId: newUser.getID(),
      verificationCode: undefined,
      verificationType: EnumVerificationType.Email,
      isVerify: newUser.getIsVerified(),
      expiresAt: googleAccount.expiresDate
    }

    const verification = VerificationEntity.Create(verificationProps).getResult().getOutput().payload;
    await this.veriricationRepository.save(verification)

    const session = SessionEntity.Create({
      userId: newUser.getID(),
      tokenAssociated: dto.idToken,
      SystemAssociated: ENumSignUpTypesLogin.GOOGLE,
      userAgent: dto.userAgent,
      ipAddress: dto.ipAddress
    }).getResult().getOutput().payload;
    session.generateNewToken()
    await this.sessionRepository.save(session)

    return Result.success<{ message: string; token: string }>(new BaseSuccess({ 
      message: 'User registered successfully', 
      token: session.getToken() 
    }))
  }
}
