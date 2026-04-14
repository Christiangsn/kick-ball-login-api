import { BaseSuccess, Result } from '@christiangsn/templates_shared'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices'
import { IDTOValues, ILanguages } from '@christiangsn/templates_shared/build/interfaces'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult'
import { ITermsRepository } from '@domain/contracts'
import { IContractTermsRepository } from '@domain/contracts/contractTerms-repo.contract'
import { TermsEntity } from '@domain/entities'

export type AcceptTermsUseCaseInjetors = {
  termsRepository: ITermsRepository
  contractTermsRepo: IContractTermsRepository
}

export class AcceptTermsUseCase extends TransferServices<AcceptTermsUseCaseInjetors> implements WithDependencies<AcceptTermsUseCaseInjetors>
{
  declare readonly termsRepository: ITermsRepository
  declare readonly contractTermsRepo: IContractTermsRepository

  
  protected async execute(dto: IDTOValues<AcceptTermsUseCase.DTO>): Promise<IResult<{ message: string }>> 
  {
    const existingTerms = await this.termsRepository.findOne(dto.userId)
    const contractTerms = await this.contractTermsRepo.getCurrentVersion()

    const currentTermAccept = existingTerms.getTerm().find(term => term.version === contractTerms.getTermsVersion());

    if (currentTermAccept) return Result.success(new BaseSuccess({
      message: 'Terms are already accepted'
    }))

    const terms = TermsEntity.Create({
      userId: dto.userId,
      terms: [{
        accepted: dto.accepted,
        version: contractTerms.getTermsVersion(),
        acceptAt: new Date(),
        ip: dto.ip
      }]
    })

    if (terms.isFailure) return Result.decline(terms.errorValue()) 
  }
    
}

export namespace AcceptTermsUseCase
{
  export type DTO = {
    userId: string
    accepted: boolean;
    version: string;
    ip: string
    lang: ILanguages.LanguageValues
  }
}
