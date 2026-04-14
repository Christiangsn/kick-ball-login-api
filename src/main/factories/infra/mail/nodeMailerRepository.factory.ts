import { FactoryAdapter } from "@christiangsn/templates_shared";
import { IMailRepository } from "@domain/contracts/mailRepository.contract";
import { NodeMailerRepository } from "@infra/mail/nodeMailer.repository";
import { NodeMailerConnectionFactory } from "@main/factories/connections/nodeMailerConnection.factory";

export class NodeMailerRepositoryFactory extends FactoryAdapter<IMailRepository>
{
    protected createInstance(): IMailRepository 
    {
        return new NodeMailerRepository(NodeMailerConnectionFactory.getCompose())
    }
}