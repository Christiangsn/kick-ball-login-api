import { google, people_v1 } from 'googleapis'
import { GoogleAuth, OAuth2Client, BaseExternalAccountClient } from 'googleapis-common'

export class GooglePeopleAPIService {
  readonly #PeopleClient: people_v1.People

  public constructor(oAuthClient: GoogleAPIRepository.GoogleAuthClient) {
    this.#PeopleClient = google.people({
      version: 'v1',
      auth: oAuthClient as GoogleAPIRepository.GoogleAuthClient
    })
  }

  /**
   * Get information about the authenticated user.
   * @param informations The fields to retrieve.
   * @throws {Error} If the request fails or the user is not authenticated.
   * @example
   * const userInfo = await googleAPIRepository.getPeopleInformations(['emailAddresses', 'names', 'photos']);
   */
  public async getPeopleInformations<T extends GoogleAPIRepository.PersonFields[]>(informations: T): Promise<Pick<people_v1.Schema$Person, T[number]>> {
    const data = await this.#PeopleClient.people.get({
      resourceName: 'people/me',
      personFields: informations.join(',')
    })

    const person = data.data

    const result = {} as Pick<people_v1.Schema$Person, T[number]>

    for (const field of informations) {
      if (field in person) {
        result[field] = person[field as keyof people_v1.Schema$Person]!
      }
    }

    return result
  }

}


namespace GoogleAPIRepository
{
  export type PersonFields = keyof people_v1.Schema$Person
  export type GoogleAuthClient = string | GoogleAuth | OAuth2Client | BaseExternalAccountClient
}

// const person = data.data

// const fullName = person.names?.[0]?.displayName
// const email = person.emailAddresses?.[0]?.value
// const phone = person.phoneNumbers?.[0]?.value
// const birthday = person.birthdays?.[0]?.date 