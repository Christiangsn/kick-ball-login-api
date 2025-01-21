import type { IBaseRepository } from '@christiangsn/templates_shared/build/interfaces'

import { UserEntity } from '../entities/user'

export interface IUserRepository extends IBaseRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | null>;
}
