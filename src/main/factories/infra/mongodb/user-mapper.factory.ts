import { FactoryAdapter } from "@christiangsn/templates_shared";
import { UserMapper } from "../../../../infra/mongodb/mappers/user.mapper";

export class UserMapperFactory extends FactoryAdapter<UserMapper>
{
    protected createInstance(): UserMapper 
    {
        return new UserMapper()
    }
}