import { FactoryAdapter } from '@christiangsn/templates_shared'
import { IController } from '@christiangsn/templates_shared/build/interfaces'

import { SignUpController } from '../../../infra/controller/sign-up.controller'
import { SignUpUseCaseFactory } from '../useCases/signUp.useCase.factory'

export class SignUpControllerFactory extends FactoryAdapter<IController<{ message: string, token: string }>>
{
  protected createInstance(): IController<{ message: string, token: string }>
  {
    const useCase = SignUpUseCaseFactory.getCompose()
    return new SignUpController(useCase)
  }
}
