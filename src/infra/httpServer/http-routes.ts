import { IHttpRootServer, PresentationView, type IController, type IDTOValidator, type TPropsRouters } from '@christiangsn/templates_shared/build/interfaces'
import type { IncomingMessage, ServerResponse } from 'http'

import type { IRegisterRouter } from './interfaces/http-register-router.interface'

export class HttpRoutes implements IHttpRootServer.Router
{
  public constructor(
    private readonly __middlewareRouter__: IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage> & { req: IncomingMessage; }>,
  ) { }

  public http (method: IHttpRootServer.HttpVerbs = IHttpRootServer.HttpVerbs.GET): TPropsRouters
  {
    return {
      register: this.register.bind(this, method.toUpperCase())
    }
  }

  private register <T> (
    method: string,
    path: string, 
    dto: new (...props: T[]) => IDTOValidator, 
    controller: IController<T>, 
    midlewares?: IHttpRootServer.RouterMiddleware[]
  )
  {
   
    this.__middlewareRouter__.add((req, res) => {
      for (const midleware of midlewares) 
      {
        midleware.intercept(req)
      }

      if (req.url !== path && req.method !== method) return
      const parsedUrl = new URL(req.url!, `http://${req.headers.host}`)
      let content = ''

      req.on('data', (chunk) => {
        content += chunk.toString() 
      })
        
      req.on('end', async () => {
        
        const dtoInstance = new dto({
          ipAddress: req.socket.remoteAddress,
          ...JSON.parse(content.toString())
        })
                
        await controller
          .execute(dtoInstance)
          .then((result) => {
            res.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(result))
          })
          .catch((error) => {
            global.systemOutPrint.error(`Error on route ${method} ${path}: ${error}`, 'HttpRoutes', error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            const errorInternal = PresentationView.build(
              500, 
              'Internal Server Error', 
              'Ocurrer an error on server, please try again later'
            )
            res.end(JSON.stringify(errorInternal))
          })
                
      })

    })

    global.systemOutPrint.info(`Route ${method} ${path} registered`, 'HttpRoutes')
  }
    
}
