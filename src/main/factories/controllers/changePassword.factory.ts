import { FactoryAdapter } from '@christiangsn/templates_shared'
import { IController } from '@christiangsn/templates_shared/build/interfaces'
import { ChangePasswordUseCaseFactory } from '../useCases/changePassword.useCase.factory'
import { ChangePasswordController } from '@infra/controller/changePassword.controller'

export class ChangePasswordControllerFactory extends FactoryAdapter<IController<string>>
{
  protected createInstance(): IController<string>
  {
    const useCase = ChangePasswordUseCaseFactory.getCompose();
    return new ChangePasswordController(useCase)
  }
}
