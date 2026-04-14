import { ConnectorAdapter } from '@christiangsn/templates_shared'
import { Transporter, createTransport  } from "nodemailer";


export class NodeMailerConnection extends ConnectorAdapter<Transporter>
{
  protected connectorName: string = 'NodeMailer'

  public constructor () {
    super()
  }

  protected async load<T>(): Promise<T> 
  {
    const transport = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
    })

    return transport as T;
  }

}
