import { FactoryAdapter } from "@christiangsn/templates_shared";
import { ModelFromSchemaDef } from "mongoose-decorators-ts";
import { MongoDbConnectionFactory } from "../../connections/mongodb-connectionFactory";
import type { Mongoose } from "mongoose";
import { ContractTermsRepository } from "@infra/mongodb/repositories/contractTerms-repository";
import { ContractTermsSchema } from "@infra/mongodb/schema/contractTerms-schema";

export class ContractTermsRepoFactory extends FactoryAdapter<ContractTermsRepository>
{
    protected createInstance(): ContractTermsRepository 
    {
        const model = ModelFromSchemaDef<typeof ContractTermsSchema, ContractTermsSchema>(ContractTermsSchema, MongoDbConnectionFactory.getCompose().getInstance<Mongoose>().connection);
        return new ContractTermsRepository(
            model
        )
    }
}

