import { ControllerEntity } from '@christiangsn/templates_shared'
import { SignInDTO } from '@app/dto/signIn.dto'
import { SignInUseCase } from '@app/useCases/login/signIn.useCase'

export class SignInController extends ControllerEntity<SignInDTO, SignInUseCase.Output>
{
}
