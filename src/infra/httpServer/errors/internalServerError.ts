import { BaseError } from '@christiangsn/templates_shared'

export class InternalServerError extends BaseError
{
  public constructor(error: Error)
  {
    super(
      error,
      'Internal Server Error',
    )
  }
}
