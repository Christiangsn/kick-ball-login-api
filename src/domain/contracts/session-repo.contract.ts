import type { IBaseRepository } from '@christiangsn/templates_shared/build/interfaces'

import type { SessionEntity } from '../entities/session'

export interface ISessionRepository extends IBaseRepository<SessionEntity> {
    findoByToken(token: string): Promise<SessionEntity | null>
}
