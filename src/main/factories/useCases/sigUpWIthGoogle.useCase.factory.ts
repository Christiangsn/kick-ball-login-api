import { FactoryAdapter } from "@christiangsn/templates_shared";
import { VerificationRepoFactory } from "../infra/mongodb/verification-repo.factory";
import { SessionRepoFactory } from "../infra/mongodb/session-repo.factory";
import { UserRepoFactory } from "../infra/mongodb/user-repo.factory";
import { SignUpWithGoogle } from "../../../app/useCases/login/signUpWithGoogle";
import { GoogleRepositoryFactory } from "../infra/google/googleRepository.factory";
import { HttpClientFactory } from "../infra/httpClient/httpClient.factory";
import { UrlServicesENv } from "@infra/env/urlServices-env";

export class SignUpWithGoogleUseCaseFactory extends FactoryAdapter<SignUpWithGoogle>
{
    protected createInstance(): SignUpWithGoogle
    {
        return new SignUpWithGoogle({
            userRepository: UserRepoFactory.getCompose(),
            sessionRepository: SessionRepoFactory.getCompose(),
            googleRepositoy: GoogleRepositoryFactory.getCompose(),
            veriricationRepository: VerificationRepoFactory.getCompose(),
            httpClient: HttpClientFactory.getCompose(),
            enrionmentServices: new UrlServicesENv({
                dashGamingUrl: process.env?.DASH_GAMING_BACKEND ?? ""
            })
        })
    }
}