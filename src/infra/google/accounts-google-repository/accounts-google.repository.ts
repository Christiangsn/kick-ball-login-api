import { OAuth2Client } from 'google-auth-library'

import type { OAuthGoogleEnv } from '../env/oauth-google.env'

import type { ISignUpExternalRepository } from './../../../domain/contracts/signup-external-repo.contract'

export class AccountsGoogleRepository implements ISignUpExternalRepository<string>
{
  private readonly __googleClient__: OAuth2Client

  public constructor (
    private readonly googleEnvironment: OAuthGoogleEnv
  ) 
  {
    this.__googleClient__ = new OAuth2Client({
      clientId: this.googleEnvironment.clientId,
      clientSecret: this.googleEnvironment.clientSecret,
      redirectUri: this.googleEnvironment.callbackUrl
    })
  }

  public async getUserByToken(tokenId: string): Promise<{ email: string; fullName: string; phoneNumber: string; dateOfBirth: string; expiresDate: number; referenceName: string; }> {
    const client = await this.__googleClient__.verifyIdToken({
      idToken: tokenId
    })

    const payload = client.getPayload()
    if (!payload) return null

    const { email, name } = payload

    return {
      email,
      fullName: name,
      phoneNumber: null,
      dateOfBirth: null,
      expiresDate: 0,
      referenceName: 'google'
    }
  }
    
}
