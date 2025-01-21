import { ConnectorAdapter } from "@christiangsn/templates_shared";
import mongoose, { Mongoose } from "mongoose";

export class MongoDbConnection extends ConnectorAdapter<Mongoose>
{
    protected connectorName: string = 'MongoDB';

    protected async load<T>(): Promise<T> 
    {
        const conn = new mongoose.Mongoose()

        conn.connection.on('connected', () => systemOutPrint.info(`Connected to ${this.connectorName}`, this.connectorName))
        conn.connection.on('error', (error) => systemOutPrint.error(`Error on ${this.connectorName}: ${error}`, this.connectorName, error))
        conn.connection.on('disconnected', () => systemOutPrint.info(`Disconnected from ${this.connectorName}`, this.connectorName))
        conn.connection.on('reconnected', () => systemOutPrint.info(`Reconnected to ${this.connectorName}`, this.connectorName))

        await conn.connect(process.env.MONGO_URL as string)

        return conn as T
    }

}