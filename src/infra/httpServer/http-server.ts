import { IConnectorAdapter, IHttpRootServer } from "@christiangsn/templates_shared/build/interfaces";
import { Server } from "http";

export class HttpServer implements IHttpRootServer.Server
{
    public constructor (
        private readonly __instanceServer__: IConnectorAdapter
    ) {}

    public async linten(port: number): Promise<void> 
    {
        void this.__instanceServer__.getInstance<Server>().listen(port)
    }
    
    public addPlugin(plugin: IHttpRootServer.IncludePlugin): IHttpRootServer.Server 
    {
        void plugin.register()
        return this
    }
}