import { FactoryAdapter } from "@christiangsn/templates_shared";
import { SignUpUseCase } from "../../../app/useCases/sign-up.useCase";
import { VerificationRepoFactory } from "../infra/mongodb/verification-repo.factory";
import { SessionRepoFactory } from "../infra/mongodb/session-repo.factory";
import { UserRepoFactory } from "../infra/mongodb/user-repo.factory";

export class SignUpUseCaseFactory extends FactoryAdapter<SignUpUseCase>
{
    protected createInstance(): SignUpUseCase 
    {
        return new SignUpUseCase(VerificationRepoFactory.getCompose(), SessionRepoFactory.getCompose(), UserRepoFactory.getCompose())
    }
}