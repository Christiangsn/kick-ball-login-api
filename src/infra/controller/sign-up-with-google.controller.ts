import { ControllerEntity } from '@christiangsn/templates_shared'

import type { SignUpWithGoogleDTO } from '../../app/dto/signUpWithGoogle.dto'
import { SignUpWithGoogle } from '@app/useCases'

export class SignUpWithGoogleController extends ControllerEntity<SignUpWithGoogleDTO, SignUpWithGoogle.Output>
{
}
