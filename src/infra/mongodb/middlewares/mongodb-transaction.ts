import { ConnectorAdapter } from '@christiangsn/templates_shared';
import { ITransaction } from '@christiangsn/templates_shared/build/interfaces/domain/ITransaction.d';
import { ClientSession, Mongoose } from 'mongoose';

export class MongoDBTransaction implements ITransaction {
    private session?: ClientSession | null = null;

    public constructor(
        private readonly connection: ConnectorAdapter<Mongoose>
    ) {}
    
    public async start(): Promise<void> {
        const mongooseConnection = this.connection.getInstance().connection;
        this.session = await mongooseConnection.startSession();
        this.session.startTransaction();
    }

    public async commitTransaction(): Promise<void> {
        if (!this.session) return;
        await this.session.commitTransaction();
        this.session = null;
    }

    public async rollback(): Promise<void> {
        if (!this.session) return;
        await this.session.abortTransaction();
        this.session = null;
    }
    
    public async on(listener: (...args: any[]) => void): Promise<void> {
        if (!this.session) await this.start();
        this.session.withTransaction(async () => {
            await listener();
        });

    }

    public async getStatus(): Promise<string> {
        return this.session.transaction.isActive ? 'active' : 'not active';
    }

    public async release(): Promise<void> {
        if (!this.session) return;
        this.session.endSession();
        this.session = null;
    }
}