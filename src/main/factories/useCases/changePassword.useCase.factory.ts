import { ChangePasswordUseCase } from "@app/useCases/user/changePasswordController";
import { FactoryAdapter } from "@christiangsn/templates_shared";

export class ChangePasswordUseCaseFactory extends FactoryAdapter<ChangePasswordUseCase> {
    protected createInstance(): ChangePasswordUseCase {
        return new ChangePasswordUseCase({})
    }
}