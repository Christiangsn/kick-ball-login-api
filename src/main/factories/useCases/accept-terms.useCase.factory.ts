import { FactoryAdapter } from "@christiangsn/templates_shared";
import { AcceptTermsUseCase } from "../../../app/useCases/user/accept-terms.useCase";
import { TermsRepositoryFactory } from "../infra/mongodb/terms-repo.factory";
import { ContractTermsRepoFactory } from "../infra/mongodb/contractTerms-repo.factory";

export class AcceptTermsUseCaseFactory extends FactoryAdapter<AcceptTermsUseCase>
{
    protected createInstance(): AcceptTermsUseCase 
    {
        return new AcceptTermsUseCase({
            contractTermsRepo: ContractTermsRepoFactory.getCompose(),
            termsRepository: TermsRepositoryFactory.getCompose()
        })
    }
}