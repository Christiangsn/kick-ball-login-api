import { FactoryAdapter } from '@christiangsn/templates_shared'
import { IController } from '@christiangsn/templates_shared/build/interfaces'


import { SignUpWithGoogleUseCaseFactory } from '../useCases/sigUpWIthGoogle.useCase.factory'
import { SignUpWithGoogleController } from '../../../infra/controller/sign-up-with-google.controller'
import { SignUpWithGoogle } from '@app/useCases'

export class SignUpWithGoogleControllerFactory extends FactoryAdapter<IController<SignUpWithGoogle.Output>>
{
  protected createInstance(): IController<SignUpWithGoogle.Output>
  {
    const useCase = SignUpWithGoogleUseCaseFactory.getCompose()
    return new SignUpWithGoogleController(useCase)
  }
}
