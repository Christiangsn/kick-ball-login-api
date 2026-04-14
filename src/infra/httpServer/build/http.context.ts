import { ContextPayload } from "@christiangsn/templates_shared/build/common/context";
import { IncomingMessage } from "node:http";

export type IHttpContextKeys = {
    requestId: string
}

export class HttpContext extends ContextPayload<IncomingMessage> {
    protected createPayload<S = IHttpContextKeys>(stract: IncomingMessage):  S {
        return {
            requestId: '1'
        } as S
        
    }
}
