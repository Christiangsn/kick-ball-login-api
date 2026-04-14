import { Environment } from '@christiangsn/templates_shared/build/common'

import { IOAuthGoogleEnv } from '../google/interfaces/oauth-google.env'

export class GoogleOAuthEnv extends Environment<IOAuthGoogleEnv>
{
  public constructor (protected readonly data: IOAuthGoogleEnv)
  {
    super(data)
  }
  public validate(): void 
  {
  }
}
