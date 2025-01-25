import { FactoryAdapter } from "@christiangsn/templates_shared";
import type { IUserRepository } from "../../../../domain/contracts/user-repo.contract";
import { ModelFromSchemaDef } from "mongoose-decorators-ts";
import { UserSchema } from "../../../../infra/mongodb/schema/user-schema";
import { MongoDbConnectionFactory } from "../../connections/mongodb-connectionFactory";
import type { Mongoose } from "mongoose";
import { UserRepository } from "../../../../infra/mongodb/repositories/user-repository";
import { UserMapperFactory } from "./user-mapper.factory";

export class UserRepoFactory extends FactoryAdapter<IUserRepository>
{
    protected createInstance(): IUserRepository 
    {
        const model = ModelFromSchemaDef<typeof UserSchema, UserSchema>(UserSchema, MongoDbConnectionFactory.getCompose().getInstance<Mongoose>().connection);
        return new UserRepository(
            model,
            UserMapperFactory.getCompose()
        )
    }
}

