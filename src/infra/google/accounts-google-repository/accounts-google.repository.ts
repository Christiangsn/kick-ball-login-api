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

  public constructor (
    private readonly googleEnvironment: Environment<IOAuthGoogleEnv>
  ) 
  {
    this.__googleClient__ = new OAuth2Client({
      clientId: this.googleEnvironment.getValue('clientId'),
      clientSecret: this.googleEnvironment.getValue('clientSecret')
    })
  }

  public async getUserByToken(tokenId: string, accessToken?: string): Promise<ISignUpExternalRepository.IGetUserByTokenResponse> {
    const client: LoginTicket = await this.__googleClient__.verifyIdToken({
      idToken: tokenId,
      audience: this.googleEnvironment.getValue('clientId')
    })

    const payload: TokenPayload | undefined = client.getPayload()
    if (!payload) return null

    const { email, name } = payload
    let dateOfBirth: string | null = null

    if (accessToken) {
      try {
        const peopleClient = new OAuth2Client({
          clientId: this.googleEnvironment.getValue('clientId'),
          clientSecret: this.googleEnvironment.getValue('clientSecret')
        })

        peopleClient.setCredentials({ access_token: accessToken })

        const peopleAPIService = new GooglePeopleAPIService(peopleClient as unknown as APIOAuth)
        const { birthdays } = await peopleAPIService.getPeopleInformations(['birthdays'])
        const birthday = birthdays?.[0]?.date

        if (birthday?.year && birthday?.month && birthday?.day) {
          dateOfBirth = `${birthday.year}-${String(birthday.month).padStart(2, '0')}-${String(birthday.day).padStart(2, '0')}`
        }
      } catch {
        dateOfBirth = null
      }
    }

    return {
      email,
      fullName: name,
      phoneNumber: null,
      dateOfBirth,
      expiresDate: 0,
      referenceName: ENumSignUpTypesLogin.GOOGLE
    }
  }
    
}
