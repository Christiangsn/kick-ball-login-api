import { BaseError, DomainEntity } from "@christiangsn/templates_shared";
import { DictionariesDomain } from "@domain/responses/dictionaries";

type IRolePermissionProps = {
    workspace: string;
    roles: string | string[]
}


export class SessionEntity extends DomainEntity<IRolePermissionProps, DictionariesDomain.TDictionariesDomainErrors>
{
    protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
    {
        const roles = this.getProps().roles;
        if (typeof roles === 'string')
        {
           const separeRoles = roles.split(',');
           this.setValue('roles', separeRoles);
        }
        return null;
    }

    public getPermissions(): string[]
    {
        return this.getValue<string[]>('roles');
    }
}
