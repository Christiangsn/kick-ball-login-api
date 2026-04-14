import { Server } from 'node:http'

import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { SecurityHeaders } from '@christiangsn/templates_shared';

export class SecurityHeadersPlugin implements IHttpRootServer.IncludePlugin<Server> {
  
  public constructor() {}

  public register(server: Server): void {
    // server.on('request', (_, res) => new SecurityHeaders(res))
  }
}
