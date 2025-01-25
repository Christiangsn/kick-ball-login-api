import { BaseError } from "@christiangsn/templates_shared";

export class InvalidTokenError extends BaseError
{
    public constructor(customMessage: string = 'The token provided is invalid')
    {
        super(
            'Invalid token',
            customMessage,
        )
    }
}