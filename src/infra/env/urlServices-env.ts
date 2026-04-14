import { Environment } from '@christiangsn/templates_shared/build/common'

import { IUrlServicesEnv } from '@domain/env/urlServices'

export class UrlServicesENv extends Environment<IUrlServicesEnv>
{
  public constructor (protected readonly data: IUrlServicesEnv)
  {
    super(data)
  }
  public validate(): void 
  {
  }
}
