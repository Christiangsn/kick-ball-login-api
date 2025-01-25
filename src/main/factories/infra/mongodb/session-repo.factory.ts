import { FactoryAdapter } from "@christiangsn/templates_shared";
import type { IUserRepository } from "../../../../domain/contracts/user-repo.contract";
import { ModelFromSchemaDef } from "mongoose-decorators-ts";
import { UserSchema } from "../../../../infra/mongodb/schema/user-schema";
import { MongoDbConnectionFactory } from "../../connections/mongodb-connectionFactory";
import type { Mongoose } from "mongoose";
import type { ISessionRepository } from "../../../../domain/contracts/session-repo.contract";
import { SessionRepository } from "../../../../infra/mongodb/repositories/session-repository";
import { SessionSchema } from "../../../../infra/mongodb/schema/session-schema";

export class SessionRepoFactory extends FactoryAdapter<ISessionRepository>
{
    protected createInstance(): ISessionRepository 
    {
        const model = ModelFromSchemaDef<typeof SessionSchema, SessionSchema>(SessionSchema, MongoDbConnectionFactory.getCompose().getInstance<Mongoose>().connection);
        return new SessionRepository(model)
    }
}

