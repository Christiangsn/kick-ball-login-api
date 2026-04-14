import { BaseError, DomainEntity } from "@christiangsn/templates_shared";
import { DictionariesDomain } from "@domain/responses/dictionaries";

export type IContractTermsProps = {
    termsVersion: number;
    content: string
}

export class ContractTerms extends DomainEntity<IContractTermsProps, DictionariesDomain.TDictionariesDomainErrors> 
{
    protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
    {
        return null
    }

    public getTermsVersion(): string
    {
        return 'v' + this.getProps().termsVersion.toFixed(3)
    }
}
