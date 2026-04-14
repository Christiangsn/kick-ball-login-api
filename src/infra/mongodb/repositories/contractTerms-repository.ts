import { IContractTermsRepository } from "@domain/contracts/contractTerms-repo.contract";
import { Document, Model } from 'mongoose'
import { ContractTermsSchema } from "../schema/contractTerms-schema";
import { ContractTerms } from "@domain/entities/contractTerms";

export class ContractTermsRepository implements IContractTermsRepository 
{
    public constructor (
    private readonly modelConn: Model<Document<ContractTermsSchema, any, any>>,
    ) {}

    public async getCurrentVersion(): Promise<ContractTerms | null> {
        const contractTerms = await this.modelConn.findOne<ContractTermsSchema>({}, {}, { sort: { 'terms.termsVersion' : -1 } });
        if (!contractTerms) return null;

        return ContractTerms.Create({
            content: contractTerms.content,
            termsVersion: contractTerms.termsVersion,
        }).getResult().getOutput().payload;
    }

}