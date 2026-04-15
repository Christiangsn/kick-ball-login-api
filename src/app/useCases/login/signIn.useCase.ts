/* eslint-disable no-var */
import { SignInDTO } from '@app/dto/signIn.dto';
import { ApplicationErrors } from '@app/errors/errors';
import { BaseSuccess, Environment, Languages, Result } from '@christiangsn/templates_shared'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices';
import type { IDTOValues, IHttpClient } from '@christiangsn/templates_shared/build/interfaces'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult';
import { ENumSignUpTypesLogin, ISessionRepository, ISignUpExternalRepository, IUserRepository, IVerificationRepository } from '@domain/contracts';
import {  SessionEntity, } from '@domain/entities';
import { IUrlServicesEnv } from '@domain/env/urlServices';
import { CryptoDomainService } from '@domain/services/crypto/crypto.domain-service';
import { PasswordValueObject } from '@domain/valuesObjects/password.ValueObject';

export type SignInUseCaseInjectos = {
  readonly userRepository: IUserRepository,
  readonly sessionRepository: ISessionRepository,
}

export namespace SignInUseCase {
  export type Output = { message: string; token: string; }
}

export class SignInUseCase extends TransferServices<SignInUseCaseInjectos> implements WithDependencies<SignInUseCaseInjectos> 
{

  declare readonly userRepository: IUserRepository;
  declare readonly veriricationRepository: IVerificationRepository;
  declare readonly sessionRepository: ISessionRepository;
  declare readonly googleRepositoy: ISignUpExternalRepository<'google'>;

  protected async execute (dto: IDTOValues<SignInDTO>): Promise<IResult<SignInUseCase.Output>>
  {
    const user = await this.userRepository.findByEmail(dto.email)
    if (!user)
    {
      return Result.decline(new ApplicationErrors.InvalidCredentialsError("Invalid credentials", "The email or password provided is incorrect.", Languages.enUS.value))
    }

    const passwordValid = PasswordValueObject.Create({
        password: dto.password
    })

    if (passwordValid.isFailure())
    {
      return Result.decline(new ApplicationErrors.InvalidCredentialsError("Invalid credentials", "The email or password provided is incorrect.", Languages.enUS.value))
    }

    const isMatch = user.getPassword().comparePassword(passwordValid.getResult().getOutput().payload.getValue("password"))
    if (!isMatch) {
        return Result.decline(new ApplicationErrors.InvalidCredentialsError("Invalid credentials", "The email or password provided is incorrect.", Languages.enUS.value))
    }

    const session = SessionEntity.Create({
      userId: user.getID(),
      tokenAssociated: "MOCK",
      SystemAssociated: ENumSignUpTypesLogin.INTERNAL,
      userAgent: dto.userAgent,
      ipAddress: dto.ipAddress
    }).getResult().getOutput().payload;
    session.generateNewToken(new CryptoDomainService(user.getID()));
    await this.sessionRepository.save(session);

    return Result.success<{ message: string; token: string }>(new BaseSuccess({ 
      message: 'Autenticação feita com sucesso', 
      token: session.getToken() 
    }))
  }
}
