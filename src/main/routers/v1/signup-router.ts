import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'

import { SignUpDTO } from '../../../infra/dto/sign-up'
import { GetIPHttpMiddleware } from '../../../infra/httpServer/middleware/get-ip.http-middleware'
import { SignUpControllerFactory } from '../../factories/controllers/signup.controller.factory'

export class SignUpRouter 
{
  private readonly routerPath: string = '/user/signup'
  private readonly httpVerb: IHttpRootServer.HttpVerbs = IHttpRootServer.HttpVerbs.POST

  public constructor (
    private readonly httpRouter: IHttpRootServer.Router
  )
  {
    this.register()
  }

  private register ()
  {
    this.httpRouter
      .http(this.httpVerb)
      .register(this.routerPath, SignUpDTO, SignUpControllerFactory.getCompose(), [new GetIPHttpMiddleware()])
  }

}
