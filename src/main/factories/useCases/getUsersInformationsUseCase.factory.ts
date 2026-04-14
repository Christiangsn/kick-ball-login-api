import { GetUserInformationsUseCase } from "@app/useCases/user/getUserInformationUseCase";
import { FactoryAdapter } from "@christiangsn/templates_shared";
import { UserRepoFactory } from "../infra/mongodb/user-repo.factory";

export class GetUserInformationUseCaseFactory extends FactoryAdapter<GetUserInformationsUseCase>
{
    protected createInstance(): GetUserInformationsUseCase 
    {
        const userRepo = UserRepoFactory.getCompose();
        return new GetUserInformationsUseCase({
            userRepository: userRepo
        })
    }
}