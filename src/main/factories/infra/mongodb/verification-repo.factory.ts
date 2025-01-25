import { FactoryAdapter } from "@christiangsn/templates_shared";
import { ModelFromSchemaDef } from "mongoose-decorators-ts";
import { MongoDbConnectionFactory } from "../../connections/mongodb-connectionFactory";
import type { Mongoose } from "mongoose";
import { VerificationRepository } from "../../../../infra/mongodb/repositories/verification-repository";
import { VerificationSchema } from "../../../../infra/mongodb/schema/verification-schema";

export class VerificationRepoFactory extends FactoryAdapter<VerificationRepository>
{
    protected createInstance(): VerificationRepository 
    {
        const model = ModelFromSchemaDef<typeof VerificationSchema, VerificationSchema>(VerificationSchema, MongoDbConnectionFactory.getCompose().getInstance<Mongoose>().connection);
        return new VerificationRepository(model)
    }
}

