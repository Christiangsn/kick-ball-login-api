import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { ServerResponse } from 'node:http';

export class FrameOptionsHeadersMiddleware implements IHttpRootServer.Router.Middleware<ServerResponse>
{
  public constructor (
    private readonly alloRootDomain: string
  ) { }

  public async intercept(res: ServerResponse): Promise<void>
  {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; frame-ancestors 'self' http://localhost:4545 http://127.0.0.1:4545"
    );

    // Opcionalmente, remove o antigo header que pode conflitar
    res.removeHeader('X-Frame-Options');

  }

}
