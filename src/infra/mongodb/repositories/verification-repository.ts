import type { Document, Model } from 'mongoose'

import type { IVerificationRepository } from '../../../domain/contracts/verification-repo.contract'
import { VerificationEntity } from '../../../domain/entities/verifications'
import type { VerificationSchema } from '../schema/verification-schema'

export class VerificationRepository implements IVerificationRepository
{
  public constructor(
    private readonly modelConn: Model<Document<VerificationSchema, any, any>>)
  {
  }

  public async save(model: VerificationEntity): Promise<void> 
  {
    const verification = new this.modelConn({
      userId: model.getUserId(),
      verificationCode: model.getVerificationCode(),
      verificationType: model.getVerificationType(),
      isVerify: model.getIsVerified(),
      expiresAt: model.getExpiresAt()
    })
    await verification.save()  
    return
  }

  public async findOne(id: string): Promise<VerificationEntity | null> 
  {
    const verification = await this.modelConn.findById<VerificationSchema>(id)
    if (!verification) return null

    return VerificationEntity.create({
      userId: verification.userId,
      verificationCode: verification.verificationCode,
      verificationType: verification.verificationType,
      isVerify: verification.isVerify,
      expiresAt: verification.expiresAt
    }).getResult()
  }

  public async update(id: string, fields: Partial<VerificationEntity>): Promise<void> 
  {
    await this.modelConn.findByIdAndUpdate(id, fields)
    return
  }
}
