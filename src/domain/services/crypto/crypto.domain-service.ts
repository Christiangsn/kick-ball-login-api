import { createHmac } from 'crypto'

import type { IDomainService } from './../random-code/random-code.domain-service'

export type ICryptoTokenPayload = {
  iss: string
  iat: number
  exp: number
  acl: string[]
  userId: string
}

export class CryptoDomainService implements IDomainService<string>
{
  private readonly __typ__: string = 'JWT'
  private readonly __secretKey__: string = 'HS256'
  private readonly __key__: string = '.net-sp-ness'

  public constructor (
    private readonly userId: string) 
  {
  }

  private toBase64Url(value: string): string
  {
    return Buffer.from(value)
      .toString('base64url')
  }

  private fromBase64Url<T>(value: string): T
  {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf-8')) as T
  }

  private normalizeToken(token: string): string
  {
    const trimmedToken = token.trim().replace(/^Bearer\s+/i, '')
    const tokenWithoutQuotes = trimmedToken.replace(/^"(.*)"$/, '$1')

    try
    {
      return decodeURIComponent(tokenWithoutQuotes)
    } catch
    {
      return tokenWithoutQuotes
    }
  }

  private createToken(): string
  {
    const header = {
      typ: this.__typ__,
      alg: this.__secretKey__
    }

    return this.createPayload(this.toBase64Url(JSON.stringify(header)))
  }

  private createPayload(header: string): string
  {
    const nowInSeconds = Math.floor(Date.now() / 1000)
    const payloadInfo = {
      iss: 'omundoedos.net',
      iat: nowInSeconds,
      exp: nowInSeconds + (60 * 60),
      acl: [],
      userId: this.userId
    }

    const payload = this.toBase64Url(JSON.stringify(payloadInfo))
    return this.createSignature(header, payload)
  }

  private createSignature(header: string, payload: string): string
  {
    const content = `${header}.${payload}`
    const signature = createHmac('sha256', this.__key__)
      .update(content)
      .digest('base64url')

    return `${content}.${signature}`
  }

  public decryptToken(token: string): ICryptoTokenPayload | null
  {
    try
    {
      const normalizedToken = this.normalizeToken(token)
      const parts = normalizedToken.split('.')

      if (parts.length !== 3)
      {
        return null
      }

      const [headerEncoded, payloadEncoded, signature] = parts

      if (!headerEncoded || !payloadEncoded || !signature)
      {
        return null
      }

      const header = this.fromBase64Url<{ typ: string, alg: string }>(headerEncoded)
      if (header.typ !== this.__typ__ || header.alg !== this.__secretKey__)
      {
        return null
      }

      const expectedSignature = createHmac('sha256', this.__key__)
        .update(`${headerEncoded}.${payloadEncoded}`)
        .digest('base64url')

      if (expectedSignature !== signature)
      {
        return null
      }

      const payload = this.fromBase64Url<ICryptoTokenPayload>(payloadEncoded)
      const nowInSeconds = Math.floor(Date.now() / 1000)

      // ajustar
      // if (payload.exp <= nowInSeconds)
      // {
      //   return null
      // }

      return payload
    } catch
    {
      return null
    }
  }

  public handler (): string
  {
    return this.createToken()
  }

}
