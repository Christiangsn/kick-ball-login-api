import { Server, IncomingMessage, ServerResponse } from 'node:http'

import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'

export class Cors implements IHttpRootServer.IncludePlugin<Server> {
  
  public constructor() {}

  public register(server: Server): void {
    server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')


      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
      }
    })
  }
}
