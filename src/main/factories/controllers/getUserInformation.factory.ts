import { FactoryAdapter } from '@christiangsn/templates_shared'
import { IController } from '@christiangsn/templates_shared/build/interfaces'
import { GetUserInformationUseCaseFactory } from '../useCases/getUsersInformationsUseCase.factory'
import { UsersControllers } from '@infra/controller/users.controller'

export class GetUserInformationControllerFactory extends FactoryAdapter<IController<string>>
{
  protected createInstance(): IController<string>
  {
    const useCase = GetUserInformationUseCaseFactory.getCompose()
    return new UsersControllers.GetUserInformationsController(useCase)
  }
}
