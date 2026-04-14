import { GetUserInformationDTO } from '@app/dto/getUserInformation.dto'
import { ApplicationErrors } from '@app/errors/errors'
import { BaseSuccess, Languages, Result, RootPresentationResponses } from '@christiangsn/templates_shared'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices'
import { IDTOValues } from '@christiangsn/templates_shared/build/interfaces'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult'
import { IUserRepository } from '@domain/contracts'
import { CryptoDomainService } from '@domain/services/crypto/crypto.domain-service'

export type GetUserPrivateInformationsUseCaseInjetors = {
  readonly userRepository: IUserRepository
}

export class GetUserInformationsUseCase extends TransferServices<GetUserPrivateInformationsUseCaseInjetors> implements WithDependencies<GetUserPrivateInformationsUseCaseInjetors>
{
  declare readonly userRepository: IUserRepository

  protected async execute(dto: IDTOValues<GetUserInformationDTO>): Promise<IResult<GetUserInformationsUseCase.Output>> 
  {
    const tokenService = new CryptoDomainService("")
    const data = tokenService.decryptToken(dto.token)
    if (!data) {
      return Result.decline(new ApplicationErrors.ContractTermsNotFoundError(
        "Token is not valid",
        "Invalid Token",
        Languages.enUS.value
      ))
    }

    const user = await this.userRepository.findOne(data.userId)
    if (!user) {
      return Result.decline(new ApplicationErrors.ContractTermsNotFoundError(
        "Token is not valid",
        "Invalid Token",
        Languages.enUS.value
      ))
    }
    return Result.success(new BaseSuccess({
      name: user.getValue("fullName"),
      userId: user.getID()
    }, RootPresentationResponses.OK))
  }
    
}

export namespace GetUserInformationsUseCase {
  export type Output = {
    userId: string
    name: string
  } 
}