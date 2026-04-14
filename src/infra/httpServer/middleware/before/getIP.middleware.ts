import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { IncomingMessage } from 'http'

export class GetIPMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage>
{
  public constructor() { }

  public async intercept(req: IncomingMessage): Promise<void>
  {
    const ip  = req.connection?.remoteAddress
        || req.socket?.remoteAddress
        || req.connection?.remoteAddress
        || req.headers['x-forwarded-for'];

    const normalizedIp = Array.isArray(ip) ? ip[0] : ip

    req.informations = {
      ...req.informations,
      ip: normalizedIp,
      ipAddress: normalizedIp
    }
  }
}
