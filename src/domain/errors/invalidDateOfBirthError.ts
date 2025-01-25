import { BaseError } from "@christiangsn/templates_shared";

export class InvalidDateOfBirthError extends BaseError
{
    public constructor()
    {
        super(
            'Invalid date of birth',
            'The date of birth informed is invalid',
        );
    }
}