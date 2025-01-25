import type { Document, Model } from 'mongoose'

import type { ISessionRepository } from '../../../domain/contracts/session-repo.contract'
import { SessionEntity } from '../../../domain/entities/session'
import type { SessionSchema } from '../schema/session-schema'

export class SessionRepository implements ISessionRepository
{
  public constructor(
        private readonly modelConn: Model<Document<SessionSchema, any, any>>,
  )
  {
  }
    
  public async save(model: SessionEntity): Promise<void> 
  {
    const session = new this.modelConn({
      sessionId: model.getID(),
      userId: model.getUserId(),
      tokenAssociated: model.getTokenAssociated(),
      SystemAssociated: model.getSystemAssociated(),
      userAgent: model.getUserAgent(),
      ipAddress: model.getIpAddress(),
    })
    await session.save()
    return
  }
  public async findOne(id: string): Promise<SessionEntity> 
  {
    const session = await this.modelConn.findById<SessionSchema>(id)
    if (!session) return null

    return SessionEntity.create({
      userId: session.userId,
      tokenAssociated: session.tokenAssociated,
      SystemAssociated: session.SystemAssociated,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
    }).getResult()
  }
  public async update(id: string, fields: Partial<SessionEntity>): Promise<void> 
  {
    await this.modelConn.findByIdAndUpdate(id, fields)
  }
    
}
