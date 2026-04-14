import type { Document, Model } from 'mongoose'
import { ITermsRepository } from '@domain/contracts/terms-repo.contract'
import { TermsEntity } from '../../../domain/entities/terms'

import { TermsSchema } from '../schema/term-schema'

export class TermsRepository implements ITermsRepository
{
  public constructor(
    private readonly modelConn: Model<Document<TermsSchema, any, any>>)
  {
  }

  public async save(model: TermsEntity): Promise<void> 
  {
    const terms = model.getTerm()

    await new this.modelConn({
      userId: model.getUserId(),
      terms
    }).save()
    return void null
  }

  public async findAll(): Promise<TermsEntity[]>
  {
    const terms = await this.modelConn.find<TermsSchema>()
    return terms.map(term => TermsEntity.Create({
      userId: term.userId,
      terms: term.terms
    }).getResult().getOutput().payload)
  }

  public async findOne(id: string): Promise<TermsEntity | null> 
  {
    const term = await this.modelConn.findOne<TermsSchema>({ 
      userId: id,
    })

    if (!term) return null

    return TermsEntity.Create({
      userId: term.userId,
      terms: term.terms
    }).getResult().getOutput().payload
  }

  public async update(id: string, fields: Partial<TermsEntity>): Promise<void> 
  {
    throw new Error('Method not implemented.')
  }
}
