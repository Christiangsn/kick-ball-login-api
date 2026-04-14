import { IHttpRootServer, IPresentationView } from "@christiangsn/templates_shared";
import { createReadStream } from "fs";
import { IncomingMessage, ServerResponse } from "http";


export class HtmlResponser implements IHttpRootServer.Requests.ProcessResponse<ServerResponse<IncomingMessage>, Buffer | string> {
    public constructor () {}

    public async response(res: ServerResponse<IncomingMessage>, context: IPresentationView<Buffer | string>): Promise<void> {
        const stream = createReadStream(context.payload.toString());
        res.writeHead(context.statusCode, { "Content-Type": "text/html; charset=utf-8" });
        stream.pipe(res);
    }
}