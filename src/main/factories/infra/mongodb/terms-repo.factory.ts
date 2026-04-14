import { FactoryAdapter } from "@christiangsn/templates_shared";
import { ModelFromSchemaDef } from "mongoose-decorators-ts";
import { MongoDbConnectionFactory } from "../../connections/mongodb-connectionFactory";
import type { Mongoose } from "mongoose";
import { ITermsRepository } from "../../../../domain/contracts/terms-repo.contract";
import { TermsSchema } from "../../../../infra/mongodb/schema/term-schema";
import { TermsRepository } from "../../../../infra/mongodb/repositories/terms-repository";

export class TermsRepositoryFactory extends FactoryAdapter<ITermsRepository>
{
    protected createInstance(): ITermsRepository 
    {
        const model = ModelFromSchemaDef<typeof TermsSchema, TermsSchema>(TermsSchema, MongoDbConnectionFactory.getCompose().getInstance<Mongoose>().connection);
        return new TermsRepository(
            model
        )
    }
}

