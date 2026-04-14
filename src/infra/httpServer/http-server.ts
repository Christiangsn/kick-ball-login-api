import { IHttpRootServer, type IConnectorAdapter } from '@christiangsn/templates_shared/build/interfaces'
import { Server } from 'http'

export class HttpServer implements IHttpRootServer.Server<Server>
{
  public constructor (
    private readonly __instanceServer__: IConnectorAdapter
  ) { }

  public async linten(port: number): Promise<void> 
  {
    systemOutPrint.info(`HTTP Server is listening on port ${port}`, 'HTTP SERVER')
    void this.__instanceServer__.getInstance<Server>().listen(port)
  }
    
  public addPlugin(plugin: IHttpRootServer.IncludePlugin<Server>): IHttpRootServer.Server<Server>
  {
    void plugin.register(this.__instanceServer__.getInstance<Server>())
    return this
  }
}
