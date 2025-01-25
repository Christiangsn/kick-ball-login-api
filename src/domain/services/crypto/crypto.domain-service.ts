import { createHmac } from 'crypto'

import type { IDomainService } from './../random-code/random-code.domain-service'

export class CryptoDomainService implements IDomainService<string>
{
  private readonly __typ__: string = 'JWT'
  private readonly __secretKey__: string = 'HS256'

  public constructor (
    private readonly userId: string) 
  {
  }

  private createToken(): string
  {
    const payload =  {
      typ: this.__typ__,
      alg: this.__secretKey__
    }
    const header = JSON.stringify(payload)
    return this.createPayload.apply(this, [Buffer.from(header).toString('base64')])
  }

  private createPayload(headers: Buffer): string
  {
    const payloadInfo = {
      iss: 'omundoedos.net',
      iat: new Date().toLocaleString(),
      exp: new Date(new Date().getTime() + 60 * 60000).toLocaleString(),
      acl: [],
      userId: this.userId
    }

    const payload = JSON.stringify(payloadInfo)
    return this.createSignature.apply(this, [headers, Buffer.from(payload).toString('base64')])
  }

  private createSignature(headers: Buffer, payload: Buffer): string
  {
    const key = '.net-sp-ness'
    const cryptoToken = createHmac('sha256', key)
      .update(headers + '.' + payload)
      .digest('base64')

    const signature = Buffer.from(cryptoToken).toString('base64')
    return headers + '.' + payload + '.' + signature
  }

  public handler (): string
  {
    return this.createToken()
  }

}
