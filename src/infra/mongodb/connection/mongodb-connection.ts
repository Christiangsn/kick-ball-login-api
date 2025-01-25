import { ConnectorAdapter } from '@christiangsn/templates_shared'
import type { IEnviroment } from '@christiangsn/templates_shared/build/interfaces'
import mongoose, { Mongoose } from 'mongoose'

import type { IMongoDBEnv } from '../interfaces/mongodb-env.interface'

export class MongoDbConnection extends ConnectorAdapter<Mongoose>
{
  protected connectorName: string = 'MongoDB'

  public constructor (
    private readonly mongoEnv: IEnviroment<IMongoDBEnv>
  ) {
    super()
  }

  protected async load<T>(): Promise<T> 
  {
    const conn = new mongoose.Mongoose()

    conn.connection.on('connected', () => global.systemOutPrint.info(`Connected to ${this.connectorName}`, this.connectorName))
    conn.connection.on('error', (error) => global.systemOutPrint.error(`Error on ${this.connectorName}: ${error}`, this.connectorName, error))
    conn.connection.on('disconnected', () => global.systemOutPrint.info(`Disconnected from ${this.connectorName}`, this.connectorName))
    conn.connection.on('reconnected', () => global.systemOutPrint.info(`Reconnected to ${this.connectorName}`, this.connectorName))

    await conn.connect(this.mongoEnv.getValue('uri'))

    return conn as T
  }

}
