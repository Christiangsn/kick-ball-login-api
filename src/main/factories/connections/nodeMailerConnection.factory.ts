import { ConnectorAdapter, FactoryAdapter } from '@christiangsn/templates_shared'

import { Transporter } from 'nodemailer'
import { NodeMailerConnection } from '@infra/mail/nodeMailer.connection'

export class NodeMailerConnectionFactory extends FactoryAdapter<ConnectorAdapter<Transporter>>
{
  protected createInstance(): ConnectorAdapter<Transporter> 
  {
    return new NodeMailerConnection() 
  }
}
