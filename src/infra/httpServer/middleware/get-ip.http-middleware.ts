import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'

export class GetIPHttpMiddleware implements IHttpRootServer.RouterMiddleware
{
  public constructor() { }

  public intercept <Payload, Response>(req: Payload & any): void
  {
    req.ip  = req.connection?.remoteAddress
        || req.socket?.remoteAddress
        || req.connection?.remoteAddress
        || req.headers['x-forwarded-for']
  }
}
