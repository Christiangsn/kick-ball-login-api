import { ControllerEntity } from '@christiangsn/templates_shared'

import type { SignUpWithGoogleDTO } from '../dto/sign-up-with-google.dto'

export class SignUpController extends ControllerEntity<SignUpWithGoogleDTO, { message: string, token: string }>
{
 
}
