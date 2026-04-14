import { IHttpRootServer, IPresentationView } from "@christiangsn/templates_shared";
import { IncomingMessage, ServerResponse } from "http";


export class JsonResponser<T> implements IHttpRootServer.Requests.ProcessResponse<ServerResponse<IncomingMessage>, T> {
    public constructor () {}

    public async response(res: ServerResponse<IncomingMessage>, context: IPresentationView<T>): Promise<void> {
        systemOutPrint.debug(`Response Payload: ${JSON.stringify(context.payload)}`, 'JSON RESPONSER');

        if (res.writableEnded) return;

        systemOutPrint.info(`Sending JSON response with status code: ${context.statusCode}`, 'JSON RESPONSER');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.statusCode = context.statusCode;
        res.end(JSON.stringify(context.payload));
    }
}