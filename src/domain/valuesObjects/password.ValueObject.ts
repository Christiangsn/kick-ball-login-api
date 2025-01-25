import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

import { InvalidPasswordError } from '../errors/invalidPasswordError'

export class PasswordValueObject extends ValueObjectEntity<{ value: string, iv?: string | Buffer<ArrayBufferLike> }>
{
  private readonly __key__: Buffer<ArrayBuffer> = Buffer.from('212230f077bb378f71cba3e5962db6345238f986eb2e04904642f5d33863c306', 'hex')

  protected check(): null | BaseError 
  {
    const passIsAlreadyCryptographic = this.checkCryptographic(this.getProps().value)
    if (passIsAlreadyCryptographic) return null

    const pass = this.getProps().value.length
    if (pass < 8)
    {
      return new InvalidPasswordError('Password must have at least 8 characters')
    }

    if (!/[A-Z]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.getProps().value))
    {
      return new InvalidPasswordError('Password must contain at least one special character')
    }

    return null
  }

  private checkCryptographic(value: string): boolean
  {

    const iv = this.getIV().toString('hex')

    const hexPattern = /^[0-9a-fA-F]+$/
    const isDataValid = typeof value === 'string' && hexPattern.test(value)
    const isIvValid = typeof iv === 'string' && iv.length === 32 && hexPattern.test(iv)
  
    return isIvValid && isDataValid
  }

  public getValue(): string
  {
    return this.getProps().value
  }

  public encryptPassword(): void
  {
    const passIsAlreadyCryptographic = this.checkCryptographic(this.getProps().value)
    if (passIsAlreadyCryptographic) return void null

    const iv = this.getIV()
    const cipher = createCipheriv('aes-256-cbc', this.__key__, iv)
    let encrypted = cipher.update(this.getProps().value, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    this.setValue('iv', iv)
    this.setValue('value', encrypted)
  }

  public getIV(): string | Buffer<ArrayBufferLike>
  {
    return this.getProps()?.iv ?? randomBytes(16) 
  }

  public comparePassword(currentInsertedPassword: string): boolean
  {
    const decipher = createDecipheriv('aes-256-cbc', this.__key__, this.getIV())
    let decrypted = decipher.update(this.getProps().value, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted === currentInsertedPassword
  }
}
