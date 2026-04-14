import { required, schemaDef } from 'mongoose-decorators-ts'
import { ITermsProps } from '@domain/entities/terms'

@schemaDef({
  name: 'terms'
})
export class TermsSchema implements ITermsProps 
{
  @required({ type: String, index: true })
  public userId!: string
  
  @required({ type: [{ 
    accepted: { type: Boolean }, 
    version: { type: String }, 
    acceptAt: { type: Date }, 
    ip: { type: String }
  }], index: true })
  public terms!: Array<{ 
    accepted: boolean; 
    version: string; 
    acceptAt: Date; 
    ip: string; 
  }>
}
