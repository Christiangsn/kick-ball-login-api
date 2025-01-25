import { BaseError } from "@christiangsn/templates_shared";

export class InvalidEmailError extends BaseError
{
    public constructor()
    {
        super(
            'Invalid e-mail',
            'The e-mail informed is invalid',
        );
    }
}