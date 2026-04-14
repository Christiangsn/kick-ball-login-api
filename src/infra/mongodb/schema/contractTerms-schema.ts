import { IContractTermsProps } from '@domain/entities/contractTerms';
import { required, schemaDef } from 'mongoose-decorators-ts'

@schemaDef({
  name: 'contractTerms'
})
export class ContractTermsSchema implements IContractTermsProps 
{
  @required({ type: Number, index: true, unique: true })
  public termsVersion!: number
  
  @required({ type: String })
  public content: string;
}
