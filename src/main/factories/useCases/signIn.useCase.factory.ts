import { SignInUseCase } from "@app/useCases/login/signIn.useCase";
import { ChangePasswordUseCase } from "@app/useCases/user/changePasswordController";
import { FactoryAdapter } from "@christiangsn/templates_shared";
import { UserRepoFactory } from "../infra/mongodb/user-repo.factory";
import { SessionRepoFactory } from "../infra/mongodb/session-repo.factory";

export class SignInUseCaseFactory extends FactoryAdapter<SignInUseCase> {
    protected createInstance(): SignInUseCase {
        return new SignInUseCase({
            userRepository: UserRepoFactory.getCompose(),
            sessionRepository: SessionRepoFactory.getCompose()
        })
    }
}