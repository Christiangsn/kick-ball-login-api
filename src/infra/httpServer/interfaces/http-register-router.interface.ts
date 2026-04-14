import {IHttpRootServer  } from "@christiangsn/templates_shared"

export type Register <Req,Res> = (req: Req, res: Res) => void 
export interface IRegisterRouter<Req, Res>
{
    add: (func: IHttpRootServer.Router.RouterRegister<Req, Res>) => void
}
