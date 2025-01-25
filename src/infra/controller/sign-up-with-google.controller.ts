import { ControllerEntity } from '@christiangsn/templates_shared'

import type { SignUpWithGoogleDTO } from '../dto/sign-up-with-google.dto'

export class SignUpWithGoogleController extends ControllerEntity<SignUpWithGoogleDTO, { message: string, token: string }>
{
}