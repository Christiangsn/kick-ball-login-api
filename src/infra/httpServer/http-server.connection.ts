import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http'

import { ConnectorAdapter } from "@christiangsn/templates_shared";

import { IRegisterRouter, Register } from './interfaces/http-register-router.interface';

export class HttpServerConnection extends ConnectorAdapter<Server> implements IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage> & { req: IncomingMessage; }>
{
    protected connectorName: string = 'Http Server'
    private readonly routers: Register<IncomingMessage, ServerResponse<IncomingMessage> & { req: IncomingMessage; }>[] = []

    public constructor () {
        super()
    }

    public add (func: Register<IncomingMessage, ServerResponse<IncomingMessage> & { req: IncomingMessage; }>): void
    {
        this.routers.push(func)
    }

    protected async load<T>(): Promise<T> 
    {
        const server = createServer(this.handleRequest.bind(this))
        return server as T
    }

    private handleRequest(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
        for (const router of this.routers) {
            router(req, res)
        }
    }
}