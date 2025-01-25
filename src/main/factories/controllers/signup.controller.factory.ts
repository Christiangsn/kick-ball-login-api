import { FactoryAdapter } from '@christiangsn/templates_shared'

import { SignUpController } from '../../../infra/controller/sign-up.controller'
import { SignUpUseCaseFactory } from '../useCases/sign-up-with-google.useCase.factory'

export class SignUpControllerFactory extends FactoryAdapter<SignUpController>
{
  protected createInstance(): SignUpController 
  {
    const useCase = SignUpUseCaseFactory.getCompose()
    return new SignUpController(useCase)
  }
}
