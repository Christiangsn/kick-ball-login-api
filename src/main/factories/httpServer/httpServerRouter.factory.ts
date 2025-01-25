import { FactoryAdapter } from '@christiangsn/templates_shared'
import type { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'

import { HttpRoutes } from '../../../infra/httpServer/http-routes'
import { HttpServerConnectionFactory } from '../connections/httpServerConnectionFactory'

export class HttpServerRouterFactory extends FactoryAdapter<IHttpRootServer.Router>
{
  protected createInstance(): IHttpRootServer.Router
  {
    return new HttpRoutes(HttpServerConnectionFactory.getCompose())
  }
}

