import { ConnectorAdapter, ServerRequester, IHttpRootServer } from '@christiangsn/templates_shared'

import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http'

import type { IRegisterRouter } from './interfaces/http-register-router.interface'

export class HttpServerConnection extends ConnectorAdapter<Server> implements IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage>>
{
  protected connectorName: string = 'Http Server'
  private readonly routers: IHttpRootServer.Router.RouterRegister<IncomingMessage, ServerResponse<IncomingMessage>>[] = []
  private static readonly methodsWithBody = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

  public constructor () {
    super()
  }

  public add (router: IHttpRootServer.Router.RouterRegister<IncomingMessage, ServerResponse<IncomingMessage>>): void
  {
    this.routers.push(router)
  }

  protected async load<T>(): Promise<T> {
    return new Promise<T>((resolve) => {
      // Criar o servidor E configurar o handler de uma vez
      const server = createServer(async (req, res) => {
        await this.handleRequest(req, res)
      })
      
      // Resolver imediatamente com a instância
      resolve(server as T)
    })
  }

  private async handleRequest(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> {
    systemOutPrint.debug(`Checking router for pathand method: ${req.method}`, 'HTTP SERVER');
    const server = new ServerRequester(req, res)
    for await (const router of this.routers) {
       const alreadyRegister = router.endpoint.register(req)
       if (alreadyRegister) {
        await this.cacheRequestBody(req)
        await router.include(server);
       }
    }
  }

  private async cacheRequestBody(req: IncomingMessage): Promise<void>
  {
    if (!this.shouldCacheRequestBody(req) || typeof req.rawBody === 'string') {
      return
    }

    req.rawBody = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      req.on('data', (chunk: Buffer) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      })

      req.on('end', () => {
        resolve(Buffer.concat(chunks).toString())
      })

      req.on('error', reject)
    })
  }

  private shouldCacheRequestBody(req: IncomingMessage): boolean
  {
    const method = req.method?.toUpperCase()
    if (!method || !HttpServerConnection.methodsWithBody.has(method)) {
      return false
    }

    const contentType = Array.isArray(req.headers['content-type'])
      ? req.headers['content-type'][0]
      : req.headers['content-type']

    return !contentType?.includes('multipart/form-data')
  }
}
