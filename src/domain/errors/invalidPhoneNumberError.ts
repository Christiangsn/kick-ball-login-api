import { BaseError } from "@christiangsn/templates_shared";

export class InvalidPhoneNumberError extends BaseError
{
    public constructor()
    {
        super(
            'Invalid phone number',
            'The phone number informed is invalid',
        );
    }
}