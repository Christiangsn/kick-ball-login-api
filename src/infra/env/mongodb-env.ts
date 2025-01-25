import { Environment } from '@christiangsn/templates_shared/build/common'

import type { IMongoDBEnv, } from '../mongodb/interfaces/mongodb-env.interface'

export class MongoDbEnv extends Environment<IMongoDBEnv>
{
  public constructor (protected readonly data: IMongoDBEnv)
  {
    super(data)
  }
  public validate(): void 
  {
  }
}
