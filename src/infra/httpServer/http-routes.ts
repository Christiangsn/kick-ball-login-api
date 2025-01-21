import { IHttpRootServer, PresentationView, type IController, type IDTOValidator, type TPropsRouters } from '@christiangsn/templates_shared/build/interfaces'
import type { IncomingMessage, ServerResponse } from 'http'

import { InternalServerError } from './errors/internalServerError'
import type { IRegisterRouter } from './interfaces/http-register-router.interface'

export class HttpRoutes implements IHttpRootServer.Router
{
  public constructor(
        private readonly __middlewareRouter__: IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage> & { req: IncomingMessage; }>,
  ) {}

  public http (method: IHttpRootServer.HttpVerbs = IHttpRootServer.HttpVerbs.GET): TPropsRouters<IHttpRootServer.Router>
  {
    return {
      register: this.register.bind(this, method.toUpperCase())
    }
  }

  private register <T> (
    method: string,
    path: string, 
    dto: new (...props: any[]) => IDTOValidator, 
    controller: IController<T>, 
    midlewares?: IHttpRootServer.RouterMiddleware[]
  )
  {
    this.__middlewareRouter__.add((req, res) => {
      if (req.url !== path && req.method !== method) return
      const parsedUrl = new URL(req.url!, `http://${req.headers.host}`)
      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString() 
      })
        
      req.on('end', async () => {
        const parsebody = JSON.parse(body)

        const dtoData = {
          ...parsebody,
          ...parsedUrl
        }
        const dtoInstance = new dto(dtoData)
                
        await controller
          .execute(dtoInstance)
          .then((result) => {
            res.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            res.end(result.payload)
          })
          .catch((error) => {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(PresentationView.build(
              500, 
              'Internal Server Error', 
              new InternalServerError(error).getPayloadError()
            ))
          })
                
      })

    })

    systemOutPrint.info(`Route ${method} ${path} registered`, 'HttpRoutes')
  }
    
}
