import { ControllerEntity } from '@christiangsn/templates_shared'
import type { SignUpDTO } from '../dto/sign-up'

export class SignUpController extends ControllerEntity<SignUpDTO, { message: string, token: string, userId: string }>
{
}
