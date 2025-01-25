export type Register <Req,Res> = (req: Req, res: Res) => void 
export interface IRegisterRouter<Req, Res>
{
    add: (func: Register<Req,Res>) => void
}
