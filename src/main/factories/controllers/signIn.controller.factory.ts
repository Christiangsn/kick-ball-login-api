import { FactoryAdapter } from '@christiangsn/templates_shared'
import { IController } from '@christiangsn/templates_shared/build/interfaces'
import { SignInUseCase } from '@app/useCases/login/signIn.useCase';
import { SignInUseCaseFactory } from '../useCases/signIn.useCase.factory';
import { SignInController } from '@infra/controller/signIn.controller';

export class SignInControllerFactory extends FactoryAdapter<IController<SignInUseCase.Output>>
{
  protected createInstance(): IController<SignInUseCase.Output>
  {
    const useCase = SignInUseCaseFactory.getCompose();
    return new SignInController(useCase)
  }
}
