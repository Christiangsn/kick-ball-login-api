import { BaseError, ValueObjectEntity } from '@christiangsn/templates_shared'

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { DictionariesDomain } from '@domain/responses/dictionaries';
import { DomainErrors } from '@domain/responses/errors';


type TPasswordValueObjectProps = { password: string, iv?: unknown }

export class PasswordValueObject extends ValueObjectEntity<TPasswordValueObjectProps, DictionariesDomain.TDictionariesDomainErrors>
{
  private readonly __key__: Buffer<ArrayBuffer> = Buffer.from('212230f077bb378f71cba3e5962db6345238f986eb2e04904642f5d33863c306', 'hex')
  private readonly __ivLength__: number = 16

  protected check(): null | BaseError<DictionariesDomain.TDictionariesDomainErrors>
  {
    const password = this.getValue<string>('password')
    const passIsAlreadyCryptographic = this.checkCryptographic(password)
    if (passIsAlreadyCryptographic) return null

    const pass = password.length
    if (pass < 8)
    {
      return new DomainErrors.InvalidPasswordError(
        "Password must have at least 8 characters",
        "The password informed is too short",
        this.getValue("lang")
      )
    }

    if (!/[A-Z]/.test(password))
    {
      return new DomainErrors.InvalidPasswordError(
        "Password must contain at least one uppercase letter",
        "The password informed must have at least one uppercase letter",
        this.getValue("lang")
      )
    }

    if (!/[a-z]/.test(password))
    {
      return new DomainErrors.InvalidPasswordError(
        "Password must contain at least one lowercase letter",
        "The password informed must have at least one lowercase letter",
        this.getValue("lang")
      )
    }

    if (!/[0-9]/.test(password))
    {
      return new DomainErrors.InvalidPasswordError(
        "Password must contain at least one number",
        "The password informed must have at least one number",
        this.getValue("lang")
      )
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    {
      return new DomainErrors.InvalidPasswordError(
        "Password must contain at least one special character",
        "The password informed must have at least one special character",
        this.getValue("lang")
      )
    }

    return null
  }

  private checkCryptographic(value: string): boolean
  {
    const iv = this.normalizeIV(this.getValue('iv'))
    const isDataValid = this.isHexValue(value) && value.length % (this.__ivLength__ * 2) === 0
    const isIvValid = iv?.length === this.__ivLength__
  
    return isIvValid && isDataValid
  }

  private isHexValue(value: string): boolean
  {
    return typeof value === 'string' && value.length > 0 && value.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(value)
  }

  private normalizeIV(value: unknown): Buffer<ArrayBufferLike> | null
  {
    if (!value) return null

    if (Buffer.isBuffer(value))
    {
      if (value.length === this.__ivLength__) return value

      const utf8Value = value.toString('utf8')
      if (this.isHexValue(utf8Value))
      {
        const hexBuffer = Buffer.from(utf8Value, 'hex')
        if (hexBuffer.length === this.__ivLength__) return hexBuffer
      }

      return null
    }

    if (value instanceof Uint8Array)
    {
      const typedArrayBuffer = Buffer.from(value)
      return typedArrayBuffer.length === this.__ivLength__ ? typedArrayBuffer : null
    }

    if (value instanceof ArrayBuffer)
    {
      const arrayBuffer = Buffer.from(value)
      return arrayBuffer.length === this.__ivLength__ ? arrayBuffer : null
    }

    if (typeof value === 'string')
    {
      const stringValue = value
      const trimmedValue = value.trim()
      if (!stringValue) return null

      if (this.isHexValue(trimmedValue))
      {
        const hexBuffer = Buffer.from(trimmedValue, 'hex')
        if (hexBuffer.length === this.__ivLength__) return hexBuffer
      }

      if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}'))
      {
        try
        {
          return this.normalizeIV(JSON.parse(trimmedValue))
        } catch
        {
          return null
        }
      }

      if (/^[A-Za-z0-9+/=]+$/.test(trimmedValue))
      {
        const base64Buffer = Buffer.from(trimmedValue, 'base64')
        if (base64Buffer.length === this.__ivLength__) return base64Buffer
      }

      const latin1Buffer = Buffer.from(stringValue, 'latin1')
      return latin1Buffer.length === this.__ivLength__ ? latin1Buffer : null
    }

    if (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      value.type === 'Buffer' &&
      'data' in value &&
      Array.isArray(value.data)
    )
    {
      const objectBuffer = Buffer.from(value.data)
      return objectBuffer.length === this.__ivLength__ ? objectBuffer : null
    }

    return null
  }

  public encryptPassword(): void
  {
    const val = this.getValue<string>("password")
    const passIsAlreadyCryptographic = this.checkCryptographic(this.getValue("password"))
    if (passIsAlreadyCryptographic) return void null

    const iv = this.getIV()
    const cipher = createCipheriv('aes-256-cbc', this.__key__, iv)
    let encrypted = cipher.update(val, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    this.setValue('iv', iv.toString('hex'))
    this.setValue('password', encrypted)
  }

  public getIV(): Buffer<ArrayBufferLike>
  {
    return this.normalizeIV(this.getValue('iv')) ?? randomBytes(this.__ivLength__)
  }

  public getIVAsHex(): string
  {
    return this.getIV().toString('hex')
  }

  public comparePassword(currentInsertedPassword: string): boolean
  {
    const val = this.getValue<string>("password")
    if (!this.checkCryptographic(val))
    {
      return val === currentInsertedPassword
    }

    try
    {
      const decipher = createDecipheriv('aes-256-cbc', this.__key__, this.getIV())
      let decrypted = decipher.update(val, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      return decrypted === currentInsertedPassword
    } catch
    {
      return false
    }
  }
}
