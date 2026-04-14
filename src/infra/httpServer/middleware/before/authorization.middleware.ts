import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import type { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult'
import { UserEntity } from '@domain/entities';
import { IncomingMessage } from 'http';

type AuthorizationUseCaseContract = {
  run: (dto: { token?: string }) => Promise<IResult<{ message: UserEntity }>>
}

export class AuthorizationMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage> {
  public constructor(
    private readonly authorizationUseCase: AuthorizationUseCaseContract
  ) { }

  public async intercept(req: IncomingMessage & { user: UserEntity }): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1];
    const result = await this.authorizationUseCase.run({ token });
    if (result.isFailure()) throw new Error(result.errorValue().getOutput().payload);
    req.informations.user = result.getResult().getOutput().payload.message;
  }

}
