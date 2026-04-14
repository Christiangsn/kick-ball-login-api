import { BaseSuccess, Environment, Languages, Result } from '@christiangsn/templates_shared'
import type { IDTOValues, IHttpClient, ILanguages } from '@christiangsn/templates_shared/build/interfaces'

import type { ISessionRepository } from '../../../domain/contracts/session-repo.contract'
import { ENumSignUpTypesLogin } from '../../../domain/contracts/signup-types-login'
import type { IUserRepository } from '../../../domain/contracts/user-repo.contract'
import type { IVerificationRepository } from '../../../domain/contracts/verification-repo.contract'
import { SessionEntity } from '../../../domain/entities/session'
import { EnumGender, UserEntity } from '../../../domain/entities/user'
import type { VerificationProps } from '../../../domain/entities/verifications'
import { VerificationEntity } from '../../../domain/entities/verifications'
import { DateOfBirthValueObject } from '../../../domain/valuesObjects/dateOfBirth.ValueObject'
import { EmailValueObject } from '../../../domain/valuesObjects/email.valueObjec'
import { PasswordValueObject } from '../../../domain/valuesObjects/password.ValueObject'
import { PhoneNumberValueObject } from '../../../domain/valuesObjects/phoneNumber.valueObject'

import { AcceptTermsUseCase } from '../user/accept-terms.useCase'
import { ITermsRepository } from '@domain/contracts/terms-repo.contract'
import { TermsEntity } from '@domain/entities/terms'
import { IDomainEvents } from '@christiangsn/templates_shared/build/interfaces/domain/IDomainEvents'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult'
import { ApplicationErrors } from '@app/errors/errors'
import { IContractTermsRepository } from '@domain/contracts/contractTerms-repo.contract'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices'
import { IUrlServicesEnv } from '@domain/env/urlServices'

export type SignUpUseCaseInjectos = {
  readonly veriricationRepository: IVerificationRepository,
  readonly sessionRepository: ISessionRepository,
  readonly contractTermsRepo: IContractTermsRepository,
  readonly userRepository: IUserRepository,
  readonly termsRepository: ITermsRepository
  readonly httpClient: IHttpClient.Request
  readonly urlServicesEnv: Environment<IUrlServicesEnv>
}

export class SignUpUseCase extends TransferServices<SignUpUseCaseInjectos> implements WithDependencies<SignUpUseCaseInjectos> {
  declare readonly veriricationRepository: IVerificationRepository
  declare readonly mailEvent: IDomainEvents.IDomainEventsService<UserEntity>
  declare readonly sessionRepository: ISessionRepository
  declare readonly contractTermsRepo: IContractTermsRepository
  declare readonly userRepository: IUserRepository
  declare readonly termsRepository: ITermsRepository
  declare readonly httpClient: IHttpClient.Request
  declare readonly urlServicesEnv: Environment<IUrlServicesEnv>

  protected async execute(dto: IDTOValues<SignUpUseCase.DTO>): Promise<Result<{ message: string, token: string, userId: string }>>
  {
    if (!dto.terms) return Result.decline(new ApplicationErrors.NotAcceptTermsError(
      "Not accepted terms",
      "You must accept the terms and conditions to register.",
      dto?.language ?? Languages.enUS.value
    ))

    const emailAlreadyExists = await this.userRepository.findByEmail(dto.email)
    if (emailAlreadyExists)
    {
      return Result.decline(new ApplicationErrors.EmailAlreadyExistsError(
        "Email already exists",
        "The email provided is already associated with another account.",
        dto?.language ?? Languages.enUS.value
      ))
    }

    const email = EmailValueObject.Create({
      email: dto.email,
    }, dto?.language ?? Languages.enUS.value)
    const password = PasswordValueObject.Create({ password: dto.password }, dto?.language ?? Languages.enUS.value)
    const dateOfBirth = DateOfBirthValueObject.Create({ dateOfBirth: dto.dateOfBirth }, dto?.language ?? Languages.enUS.value)

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
      phoneNumber = PhoneNumberValueObject.Create({ value: dto.phoneNumber })
      if (phoneNumber.isFailure())
      {
        return Result.decline(phoneNumber.errorValue())
      }
    }

    const newUser = UserEntity.Create(
      {
        dateOfBirth: dateOfBirth.getResult().getOutput().payload,
        lang: dto.language,
        email: email.getResult().getOutput().payload,
        password: password.getResult().getOutput().payload,
        fullName: dto.fullName,
        phoneNumber: phoneNumber?.getResult().getOutput().payload ?? null,
        gender: dto?.gender ?? null,
        isActive: false,
        isVerified: false,
      }).getResult().getOutput().payload;
    
    newUser.getPassword().encryptPassword()
    // newUser.registerEvent(event);
    
    const contract = await this.contractTermsRepo.getCurrentVersion();
    if (!contract)
    {
      return Result.decline(new ApplicationErrors.ContractTermsNotFoundError(
        "Contract terms not found",
        "No active contract terms version is available for sign up.",
        dto?.language ?? Languages.enUS.value
      ))
    }

    const terms = TermsEntity.Create({
      userId: newUser.getID(),
      terms: [{
        accepted: dto.terms.accepted,
        version: contract.getTermsVersion(),
        acceptAt: new Date(),
        ip: dto.terms.ip
      }]
    }).getResult().getOutput().payload;

    await this.termsRepository.save(terms)
    await this.userRepository.save(newUser)

    const verificationProps: VerificationProps = {
      userId: newUser.getID(),
      verificationType: undefined,
      isVerify: newUser.getIsVerified(),
      expiresAt: undefined,
      verificationCode: undefined
    }

    const verification = VerificationEntity.Create(verificationProps).getResult().getOutput().payload;
    
    await this.veriricationRepository.save(verification)

    const session = SessionEntity.Create({
      userId: newUser.getID(),
      tokenAssociated: "MOCK",
      SystemAssociated: ENumSignUpTypesLogin.INTERNAL,
      userAgent: dto.userAgent,
      ipAddress: dto.ipAddress
    }).getResult().getOutput().payload;
    session.generateNewToken();
    await this.sessionRepository.save(session);

    try {
      await this.httpClient.post(this.urlServicesEnv.getValue("dashGamingUrl") + "/private/register-player", {
      associateId: newUser.getID()
    }, {} as any)
    } catch (e: any) {
      systemOutPrint.error("erro to send create new player", this.urlServicesEnv.getValue("dashGamingUrl") + "/private/register-player", e)
    }

    newUser.dispatchEvent();
    return Result.success<{ message: string; token: string, userId: string }>(new BaseSuccess({ 
      message: 'User registered successfully', 
      token: session.getToken(),
      userId: newUser.getID()
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
      language?: ILanguages.LanguageValues;
      terms: Omit<AcceptTermsUseCase.DTO, 'userId'>
  }
}
