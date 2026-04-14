import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { IncomingMessage } from 'http'

export class GetUserAgentMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage>
{
  public constructor() { }

  public async intercept(req: IncomingMessage): Promise<void>
  {
    const userAgentHeader = req.headers['user-agent'];
    const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader;

    req.informations = {
      ...req.informations,
      userAgent
    }
  }
}
