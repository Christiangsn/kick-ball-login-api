import { FactoryAdapter } from '@christiangsn/templates_shared'
import type { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'

import { HttpServer } from '../../../infra/httpServer/http-server'
import { HttpServerConnectionFactory } from '../connections/httpServerConnectionFactory'

export class HttpServerFactory extends FactoryAdapter<IHttpRootServer.Server>
{
  protected createInstance(): IHttpRootServer.Server 
  {
    return new HttpServer(HttpServerConnectionFactory.getCompose())
  }
}

