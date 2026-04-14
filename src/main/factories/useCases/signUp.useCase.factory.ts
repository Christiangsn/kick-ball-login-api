import { FactoryAdapter } from "@christiangsn/templates_shared";
import { SignUpUseCase } from "../../../app/useCases/login/sign-up.useCase";
import { VerificationRepoFactory } from "../infra/mongodb/verification-repo.factory";
import { SessionRepoFactory } from "../infra/mongodb/session-repo.factory";
import { UserRepoFactory } from "../infra/mongodb/user-repo.factory";
import { TermsRepositoryFactory } from "../infra/mongodb/terms-repo.factory";
import { ContractTermsRepoFactory } from "../infra/mongodb/contractTerms-repo.factory";
import { HttpClientFactory } from "../infra/httpClient/httpClient.factory";
import { UrlServicesENv } from "@infra/env/urlServices-env";

export class SignUpUseCaseFactory extends FactoryAdapter<SignUpUseCase>
{
    protected createInstance(): SignUpUseCase 
    {
        return new SignUpUseCase({
            userRepository: UserRepoFactory.getCompose(),
            veriricationRepository: VerificationRepoFactory.getCompose(),
            sessionRepository: SessionRepoFactory.getCompose(),
            termsRepository: TermsRepositoryFactory.getCompose(),
            contractTermsRepo: ContractTermsRepoFactory.getCompose(),
            httpClient: HttpClientFactory.getCompose(),
            urlServicesEnv: new UrlServicesENv({
                dashGamingUrl: process.env?.DASH_GAMING_BACKEND ?? ""
            })
        })
    }
}