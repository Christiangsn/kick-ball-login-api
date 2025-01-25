import { BaseError } from "@christiangsn/templates_shared";

export class InvalidPasswordError extends BaseError
{
    public constructor(message: string)
    {
        super(
            'Invalid password',
            message,
        );
    }
}