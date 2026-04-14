import { IPresentationView } from "@christiangsn/templates_shared";
import { OutComeContract } from "@christiangsn/templates_shared/build/root";
import { IncomingMessage, ServerResponse } from "http";
import { IServerResponser, IServerRR } from "../../interfaces/serverRR.interface";
import { createReadStream } from "fs";

export class SendFileResponser implements IServerResponser {
    public constructor (
        private readonly payloadResponse: OutComeContract.OutComePayload<string | Buffer>,
        private readonly instanceServerResponse: IServerRR<IncomingMessage, ServerResponse<IncomingMessage>>
    ) {}

    public send(): void {
        const response = this.instanceServerResponse.getResponse();
        response.statusCode = this.payloadResponse.type.statusCode;
        response.setHeader('Content-Type', 'application/octet-stream');        
        const stream = createReadStream(this.payloadResponse.payload);
        stream.pipe(response);
    }
}