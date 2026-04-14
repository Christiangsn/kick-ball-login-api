import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library'
import { OAuth2Client as APIOAuth } from 'googleapis-common'


import type { ISignUpExternalRepository } from './../../../domain/contracts/signup-external-repo.contract'
import { IOAuthGoogleEnv } from '../interfaces/oauth-google.env';
import { Environment } from '@christiangsn/templates_shared/build/common';
import { GooglePeopleAPIService } from '../services/googlePeopleAPI.service';
import { ENumSignUpTypesLogin } from '@domain/contracts';

export class AccountsGoogleRepository implements ISignUpExternalRepository<'google'>
{
  private readonly __googleClient__: OAuth2Client
  private readonly __peopleAPIService__: GooglePeopleAPIService

  public constructor (
    private readonly googleEnvironment: Environment<IOAuthGoogleEnv>
  ) 
  {
    this.__googleClient__ = new OAuth2Client({
      clientId: this.googleEnvironment.getValue('clientId'),
      clientSecret: this.googleEnvironment.getValue('clientSecret')
    })

    this.__peopleAPIService__ = new GooglePeopleAPIService(this.__googleClient__ as unknown as APIOAuth)
  }

  public async getUserByToken(tokenId: string): Promise<ISignUpExternalRepository.IGetUserByTokenResponse> {
    const client: LoginTicket = await this.__googleClient__.verifyIdToken({
      idToken: tokenId
    })

    const payload: TokenPayload | undefined = client.getPayload()
    if (!payload) return null

    const { email, name } = payload
    const { birthdays } = await this.__peopleAPIService__.getPeopleInformations(['birthdays'])

    return {
      email,
      fullName: name,
      phoneNumber: null,
      dateOfBirth: birthdays[0].text,
      expiresDate: 0,
      referenceName: ENumSignUpTypesLogin.GOOGLE
    }
  }
    
}
