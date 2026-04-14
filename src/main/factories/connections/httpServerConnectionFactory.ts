import { ConnectorAdapter, FactoryAdapter } from '@christiangsn/templates_shared'
import type { IncomingMessage, Server, ServerResponse } from 'node:http'

import { HttpServerConnection } from '../../../infra/httpServer/http-server.connection'
import type { IRegisterRouter } from '../../../infra/httpServer/interfaces/http-register-router.interface'

export class HttpServerConnectionFactory extends FactoryAdapter<ConnectorAdapter<Server> & IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage>>>
{
  protected createInstance(): ConnectorAdapter<Server> & IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage>>
  {
    return new HttpServerConnection()
  }
}

