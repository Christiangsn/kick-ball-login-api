import { ConnectorAdapter, FactoryAdapter } from '@christiangsn/templates_shared'
import { get } from 'env-var'
import type { Mongoose } from 'mongoose'

import { MongoDbEnv } from '../../../infra/env/mongodb-env'
import { MongoDbConnection } from '../../../infra/mongodb/connection/mongodb-connection'

export class MongoDbConnectionFactory extends FactoryAdapter<ConnectorAdapter<Mongoose>>
{
  protected createInstance(): ConnectorAdapter<Mongoose> 
  {
    const env = new MongoDbEnv({ 
      uri: get('MONGODB_URI').required().asString(),
    })
    return new MongoDbConnection(env) 
  }
}
