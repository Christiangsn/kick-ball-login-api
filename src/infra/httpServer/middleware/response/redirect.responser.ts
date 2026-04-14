import { IHttpRootServer, IPresentationView } from "@christiangsn/templates_shared";
import { IncomingMessage, ServerResponse } from "http";


export class RedirectResponser implements IHttpRootServer.Requests.ProcessResponse<ServerResponse<IncomingMessage>, string> {
    public constructor () {}

    public async response(res: ServerResponse<IncomingMessage>, context: IPresentationView<string>): Promise<void> {
        res.writeHead(context.statusCode, { Location: context.payload.toString() || '/' });
        res.end();        
    }
}