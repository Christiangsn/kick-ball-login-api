import { ContractTerms } from "@domain/entities/contractTerms";

export interface IContractTermsRepository {
    getCurrentVersion(): Promise<ContractTerms | null>
}
