// import { FactoryAdapter } from "@christiangsn/templates_shared";

// import { AuthorizationUseCase } from "src/app/useCases/authorization.useCase";
// import { SessionRepoFactory } from "../infra/mongodb/session-repo.factory";
// import { UserRepoFactory } from './../infra/mongodb/user-repo.factory';

// export class AuthorizationUseCaseFactory extends FactoryAdapter<AuthorizationUseCase>
// {
//     protected createInstance(): AuthorizationUseCase 
//     {
//         const sessionRepository = SessionRepoFactory.getCompose();
//         const userRepo = UserRepoFactory.getCompose()
//         return new AuthorizationUseCase(sessionRepository, userRepo)
//     }
// }