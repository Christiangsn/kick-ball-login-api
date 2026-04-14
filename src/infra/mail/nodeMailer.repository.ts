import { ConnectorAdapter } from "@christiangsn/templates_shared"
import { IMailRepository } from "@domain/contracts/mailRepository.contract"
import { Transporter } from "nodemailer"

export class NodeMailerRepository implements IMailRepository
{
    private readonly transporterConnector: Transporter

    public constructor (
        transporterConnector: ConnectorAdapter<Transporter>
    ) {
        this.transporterConnector = transporterConnector.getInstance<Transporter>()
    }

    public async sendMail (to: string, subject: string, body: string): Promise<void> {
        const transporter = this.transporterConnector
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to,
            subject,
            text: body,
            html: `<b>${body}</b>`,
        })


    }
}
        